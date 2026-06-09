import { NextResponse, type NextRequest } from 'next/server';
import { Resend, type Attachment } from 'resend';
import { companyDetails, siteConfig } from '../../config/siteConfig';

type ContactSubmission = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  application: string;
  message: string;
  website: string;
};

const requiredFields: Array<keyof Omit<ContactSubmission, 'phone' | 'website'>> = [
  'firstName',
  'lastName',
  'email',
  'company',
  'subject',
  'application',
  'message',
];

const attachmentLimits = {
  maxFiles: 3,
  maxFileSize: 5 * 1024 * 1024,
  maxTotalSize: 15 * 1024 * 1024,
};

const allowedAttachmentExtensions = new Set([
  'pdf',
  'jpg',
  'jpeg',
  'png',
  'webp',
  'doc',
  'docx',
  'xls',
  'xlsx',
]);

const allowedAttachmentTypes = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
]);

function textValue(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function readSubmission(value: unknown): ContactSubmission {
  const input = value && typeof value === 'object' ? (value as Record<string, unknown>) : {};

  return {
    firstName: textValue(input.firstName, 80),
    lastName: textValue(input.lastName, 80),
    email: textValue(input.email, 160),
    company: textValue(input.company, 160),
    phone: textValue(input.phone, 80),
    subject: textValue(input.subject, 180),
    application: textValue(input.application, 160),
    message: textValue(input.message, 3000),
    website: textValue(input.website, 120),
  };
}

function fileExtension(filename: string) {
  return filename.split('.').pop()?.toLowerCase() ?? '';
}

function formatFileSize(bytes: number) {
  return `${Math.round((bytes / 1024 / 1024) * 10) / 10} MB`;
}

function sanitizeFilename(filename: string) {
  return filename.replace(/[/\\]/g, '-').replace(/[^\w.\- ()]/g, '').slice(0, 120) || 'attachment';
}

function readSubmissionFromFormData(formData: FormData): ContactSubmission {
  return {
    firstName: textValue(formData.get('firstName'), 80),
    lastName: textValue(formData.get('lastName'), 80),
    email: textValue(formData.get('email'), 160),
    company: textValue(formData.get('company'), 160),
    phone: textValue(formData.get('phone'), 80),
    subject: textValue(formData.get('subject'), 180),
    application: textValue(formData.get('application'), 160),
    message: textValue(formData.get('message'), 3000),
    website: textValue(formData.get('website'), 120),
  };
}

function readFilesFromFormData(formData: FormData) {
  return formData
    .getAll('attachments')
    .filter((value): value is File => value instanceof File && value.size > 0);
}

async function buildAttachments(files: File[]): Promise<Attachment[]> {
  if (files.length > attachmentLimits.maxFiles) {
    throw new Error(`Please attach no more than ${attachmentLimits.maxFiles} files.`);
  }

  const totalSize = files.reduce((total, file) => total + file.size, 0);
  if (totalSize > attachmentLimits.maxTotalSize) {
    throw new Error(`Attachments must be under ${formatFileSize(attachmentLimits.maxTotalSize)} total.`);
  }

  return Promise.all(
    files.map(async (file) => {
      const extension = fileExtension(file.name);

      const hasSupportedExtension = allowedAttachmentExtensions.has(extension);
      const hasUnsupportedSpecificType =
        file.type && file.type !== 'application/octet-stream' && !allowedAttachmentTypes.has(file.type);

      if (!hasSupportedExtension || hasUnsupportedSpecificType) {
        throw new Error(`${file.name} is not a supported file type.`);
      }

      if (file.size > attachmentLimits.maxFileSize) {
        throw new Error(`${file.name} must be under ${formatFileSize(attachmentLimits.maxFileSize)}.`);
      }

      const content = Buffer.from(await file.arrayBuffer()).toString('base64');

      return {
        content,
        filename: sanitizeFilename(file.name),
        contentType: file.type,
      };
    }),
  );
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function detailRow(label: string, value: string) {
  if (!value) {
    return '';
  }

  return `
    <tr>
      <td style="padding: 8px 12px; color: #6b7280; font-size: 13px; width: 150px;">${escapeHtml(label)}</td>
      <td style="padding: 8px 12px; color: #111827; font-size: 14px;">${escapeHtml(value)}</td>
    </tr>
  `;
}

function buildTextEmail(submission: ContactSubmission) {
  return [
    `New contact form submission from ${siteConfig.siteName}`,
    '',
    `Name: ${submission.firstName} ${submission.lastName}`,
    `Email: ${submission.email}`,
    `Company: ${submission.company}`,
    `Region: ${siteConfig.regionLabel}`,
    submission.phone ? `Phone: ${submission.phone}` : '',
    `Subject: ${submission.subject}`,
    `Application: ${submission.application}`,
    '',
    'Message:',
    submission.message,
  ]
    .filter(Boolean)
    .join('\n');
}

function buildHtmlEmail(submission: ContactSubmission) {
  const senderName = `${submission.firstName} ${submission.lastName}`;

  return `
    <div style="background: #f6f4ee; padding: 28px; font-family: Arial, sans-serif;">
      <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e0d3;">
        <div style="padding: 24px 28px; border-bottom: 1px solid #e5e0d3;">
          <p style="margin: 0 0 8px; color: #8f835f; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase;">Website enquiry</p>
          <h1 style="margin: 0; color: #111827; font-size: 22px; line-height: 1.35;">${escapeHtml(submission.subject)}</h1>
        </div>
        <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 0;">
          ${detailRow('Name', senderName)}
          ${detailRow('Email', submission.email)}
          ${detailRow('Company', submission.company)}
          ${detailRow('Region', siteConfig.regionLabel)}
          ${detailRow('Phone', submission.phone)}
          ${detailRow('Application', submission.application)}
        </table>
        <div style="padding: 20px 28px 28px; border-top: 1px solid #e5e0d3;">
          <p style="margin: 0 0 10px; color: #6b7280; font-size: 13px;">Message</p>
          <div style="white-space: pre-wrap; color: #111827; font-size: 15px; line-height: 1.65;">${escapeHtml(submission.message)}</div>
        </div>
      </div>
    </div>
  `;
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type') ?? '';
  const isMultipart = contentType.toLowerCase().includes('multipart/form-data');
  const formData = isMultipart ? await request.formData().catch(() => null) : null;
  const payload = formData ? null : await request.json().catch(() => null);
  const submission = formData ? readSubmissionFromFormData(formData) : readSubmission(payload);

  if (submission.website) {
    return NextResponse.json({ ok: true });
  }

  const missingFields = requiredFields.filter((field) => !submission[field]);

  if (missingFields.length || !isValidEmail(submission.email)) {
    return NextResponse.json(
      { ok: false, error: 'Please complete the required fields with a valid email address.' },
      { status: 400 },
    );
  }

  let attachments: Attachment[] = [];

  if (formData) {
    try {
      attachments = await buildAttachments(readFilesFromFormData(formData));
    } catch (error) {
      return NextResponse.json(
        { ok: false, error: error instanceof Error ? error.message : 'One or more attachments could not be accepted.' },
        { status: 400 },
      );
    }
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FORM_FROM_EMAIL;
  const toEmail = process.env.CONTACT_FORM_TO_EMAIL || companyDetails.salesEmail || companyDetails.infoEmail;

  if (!resendApiKey || !fromEmail || !toEmail) {
    return NextResponse.json(
      { ok: false, error: 'Email service is not configured.' },
      { status: 500 },
    );
  }

  const senderName = `${submission.firstName} ${submission.lastName}`;
  const resend = new Resend(resendApiKey);
  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: submission.email,
    subject: `[${siteConfig.siteName}] ${submission.subject}`,
    text: buildTextEmail(submission),
    html: buildHtmlEmail(submission),
    attachments: attachments.length ? attachments : undefined,
    headers: {
      'X-Entity-Ref-ID': `contact-${Date.now()}`,
    },
  });

  if (error) {
    console.error('Failed to send contact form email', error);
    return NextResponse.json(
      { ok: false, error: 'Message could not be sent. Please email us directly.' },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    sender: senderName,
  });
}
