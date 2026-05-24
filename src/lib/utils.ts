export function stripViText(text: string, showVi: boolean): string {
  if (showVi || typeof text !== 'string') return text;
  // Regex matches "(...)" or " (...)" containing Vietnamese characters
  const viRegex = /\s*\([^)]*[àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳýỹỷỵ]+[^)]*\)/gi;
  return text.replace(viRegex, '');
}
