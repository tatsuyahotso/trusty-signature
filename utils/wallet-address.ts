export function isPlausibleWalletAddress(value: string) {
  const normalizedValue = value.trim();

  if (/\s/.test(normalizedValue)) return false;

  return (
    /^0x[a-fA-F0-9]{32,128}$/.test(normalizedValue) ||
    /^[1-9A-HJ-NP-Za-km-z]{26,64}$/.test(normalizedValue) ||
    /^[a-z0-9]{1,24}1[ac-hj-np-z02-9]{20,100}$/i.test(normalizedValue)
  );
}
