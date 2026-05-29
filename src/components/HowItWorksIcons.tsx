import { MdPhoneInTalk, MdRequestQuote, MdInventory2, MdHomeWork } from 'react-icons/md';

const ICONS = [MdPhoneInTalk, MdRequestQuote, MdInventory2, MdHomeWork];

export default function HowItWorksIcons({ index, className }: { index: number; className?: string }) {
  const Icon = ICONS[index];
  if (!Icon) return null;
  return <Icon className={className} aria-hidden="true" />;
}
