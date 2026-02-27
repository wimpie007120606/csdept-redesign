import { Navigate, useParams } from 'react-router';
import { isSupportedLang } from '../utils/langPath';

export function RedirectToStudyUndergraduate() {
  const { lang } = useParams<{ lang: string }>();
  const l = lang && isSupportedLang(lang) ? lang : 'en';
  return <Navigate to={`/${l}/study/undergraduate`} replace />;
}

export function RedirectToStudyPostgraduate() {
  const { lang } = useParams<{ lang: string }>();
  const l = lang && isSupportedLang(lang) ? lang : 'en';
  return <Navigate to={`/${l}/study/postgraduate`} replace />;
}

export function RedirectStudyToUndergraduate() {
  const { lang } = useParams<{ lang: string }>();
  const l = lang && isSupportedLang(lang) ? lang : 'en';
  return <Navigate to={`/${l}/study/undergraduate`} replace />;
}
