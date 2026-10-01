import { getSupabase, publicMediaUrl, storageBucket } from './client';

export const RESUME_STORAGE_PATH = 'profile/cv.pdf';

export async function uploadResumePdf(file: File): Promise<string> {
  const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
  if (!isPdf) throw new Error('Choose a PDF file');
  if (file.size > 10 * 1024 * 1024) throw new Error('PDF must be 10 MB or smaller');

  const { error } = await getSupabase().storage.from(storageBucket()).upload(RESUME_STORAGE_PATH, file, {
    upsert: true,
    contentType: 'application/pdf',
    cacheControl: '3600'
  });
  if (error) throw new Error(error.message);
  return publicMediaUrl(`/${RESUME_STORAGE_PATH}`);
}

export async function deleteResumePdf(): Promise<void> {
  const { error } = await getSupabase().storage.from(storageBucket()).remove([RESUME_STORAGE_PATH]);
  if (error) throw new Error(error.message);
}

export async function fetchResumePdf(): Promise<string> {
  const { data, error } = await getSupabase().from('profile').select('resume_pdf').eq('id', 1).maybeSingle();
  if (error || !data) return '';
  const path = typeof data.resume_pdf === 'string' ? data.resume_pdf.trim() : '';
  return path ? publicMediaUrl(path) : '';
}
