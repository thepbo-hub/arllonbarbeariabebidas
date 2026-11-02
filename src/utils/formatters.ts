import { CartItem } from '../types';
import { WHATSAPP_PHONE } from '../data/products';

export function formatCurrency(cents: number): string {
  const value = cents / 100;
  return `R$ ${value.toFixed(2).replace('.', ',')}`;
}

export function formatNumberCurrency(val: number): string {
  return `R$ ${val.toFixed(2).replace('.', ',')}`;
}

export function buildWhatsAppOrderMessage(items: CartItem[]): string {
  if (items.length === 0) return '';

  let totalCents = 0;
  const itemsText = items
    .map((item) => {
      const subtotalCents = item.priceInCents * item.quantity;
      totalCents += subtotalCents;
      const displayName = item.variant ? `${item.name} ${item.variant}` : item.name;

      return `• ${item.quantity}x ${displayName}\n  Unitário: ${formatCurrency(item.priceInCents)}\n  Subtotal: ${formatCurrency(subtotalCents)}`;
    })
    .join('\n\n');

  const totalFormatted = formatCurrency(totalCents);

  return `Olá, Arllon Fernandes Barbearia! Gostaria de solicitar as seguintes bebidas da barbearia:\n\n*MEU PEDIDO*\n\n${itemsText}\n\n*TOTAL DO PEDIDO: ${totalFormatted}*\n\nPoderiam confirmar meu pedido, por favor?`;
}

export function getWhatsAppDirectUrl(items: CartItem[]): string {
  const messageText = buildWhatsAppOrderMessage(items);
  const encodedText = encodeURIComponent(messageText);
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodedText}`;
}
