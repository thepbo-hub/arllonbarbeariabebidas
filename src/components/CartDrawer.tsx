import React from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency, getWhatsAppDirectUrl } from '../utils/formatters';
import {
  X,
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalCents,
    totalItemsCount,
  } = useCart();

  if (!isOpen) return null;

  const handleFinalizeWhatsApp = () => {
    if (items.length === 0) return;
    const url = getWhatsAppDirectUrl(items);
    
    // Automatically clear order and close drawer upon checkout
    clearCart();
    closeCart();

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Carrinho de Compras"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-[#04172B]/80 backdrop-blur-sm transition-opacity"
      />

      {/* Slide Drawer Panel (Desktop right side, Mobile full height/bottom sheet) */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#0B2340] border-l border-[#1687FF]/30 shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-4 sm:p-6 border-b border-white/10 bg-[#082E5A]/70 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#1687FF]/20 border border-[#1687FF]/40 flex items-center justify-center text-[#42C8FF]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#F5F8FC]">Seu Carrinho</h2>
                <span className="text-xs text-[#AAB8CA]">
                  {totalItemsCount} {totalItemsCount === 1 ? 'item selecionado' : 'itens selecionados'}
                </span>
              </div>
            </div>

            <button
              onClick={closeCart}
              aria-label="Fechar carrinho"
              className="w-9 h-9 rounded-xl bg-[#04172B] hover:bg-[#1687FF]/20 border border-white/10 text-[#AAB8CA] hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {items.length === 0 ? (
              /* Empty Cart State */
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-20 h-20 rounded-full bg-[#082E5A] border border-[#1687FF]/30 flex items-center justify-center text-[#42C8FF] mb-4 shadow-[0_0_30px_rgba(22,135,255,0.2)]">
                  <ShoppingBag className="w-10 h-10 opacity-70" />
                </div>
                <h3 className="text-lg font-bold text-[#F5F8FC]">
                  Seu carrinho está vazio
                </h3>
                <p className="text-xs text-[#AAB8CA] mt-2 max-w-xs leading-relaxed">
                  Que tal uma bebida bem gelada para acompanhar seu atendimento na barbearia?
                </p>
                <button
                  onClick={closeCart}
                  className="btn-3d-primary mt-6 px-6 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                >
                  <span>Explorar Bebidas</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* Items List */
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between pb-1 border-b border-white/5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#AAB8CA]">
                    Itens Selecionados
                  </span>
                  <button
                    onClick={clearCart}
                    className="text-[11px] text-[#FF5A65] hover:underline"
                  >
                    Esvaziar tudo
                  </button>
                </div>

                {items.map((item) => {
                  const itemSubtotalCents = item.priceInCents * item.quantity;

                  return (
                    <div
                      key={item.cartItemId}
                      className="p-3.5 rounded-xl bg-[#082E5A]/70 border border-[#1687FF]/20 shadow-md flex gap-3.5 items-center justify-between"
                    >
                      {/* Thumbnail */}
                      <div className="w-14 h-16 rounded-lg bg-[#04172B] border border-white/10 flex items-center justify-center p-1 shrink-0 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain filter drop-shadow"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Info & Quantity */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-[#F5F8FC] truncate">
                          {item.name}
                        </h4>
                        {item.variant && (
                          <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#1687FF]/20 text-[#42C8FF] border border-[#1687FF]/30 mt-0.5">
                            {item.variant}
                          </span>
                        )}
                        <div className="text-xs text-[#AAB8CA] mt-1">
                          Unitário: <span className="font-mono-numbers">{formatCurrency(item.priceInCents)}</span>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                              aria-label="Diminuir unidade"
                              className="btn-3d-secondary w-7 h-7 flex items-center justify-center text-xs"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center text-xs font-bold text-white font-mono-numbers">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                              aria-label="Aumentar unidade"
                              className="btn-3d-secondary w-7 h-7 flex items-center justify-center text-xs"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-sm font-bold text-white font-mono-numbers">
                            {formatCurrency(itemSubtotalCents)}
                          </span>
                        </div>
                      </div>

                      {/* Remove Button (Red 3D as specified) */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.cartItemId)}
                        aria-label={`Remover ${item.name} do carrinho`}
                        className="btn-3d-danger w-8 h-8 flex items-center justify-center shrink-0 self-start mt-0.5"
                        title="Remover produto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Drawer Footer with Totals and Direct Automatic WhatsApp Checkout */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-white/10 bg-[#082E5A]/80 flex flex-col gap-3">
              {/* Total Calculation */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#AAB8CA] font-medium">
                    Total do Pedido
                  </span>
                  <div className="text-[11px] text-[#AAB8CA]">
                    {totalItemsCount} {totalItemsCount === 1 ? 'bebida' : 'bebidas no total'}
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#F5F8FC] font-mono-numbers">
                  {formatCurrency(totalCents)}
                </div>
              </div>

              {/* Main 3D Checkout Button with Shimmer */}
              <button
                type="button"
                onClick={handleFinalizeWhatsApp}
                className="btn-3d-primary btn-shimmer w-full py-3.5 px-4 text-sm font-bold flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer"
              >
                <span>FINALIZAR PEDIDO VIA WHATSAPP</span>
                <ExternalLink className="w-4 h-4 text-[#42C8FF]" />
              </button>

              <button
                type="button"
                onClick={closeCart}
                className="btn-3d-secondary w-full py-2.5 text-xs font-semibold text-[#AAB8CA] hover:text-white text-center cursor-pointer"
              >
                Continuar Escolhendo
              </button>

              <p className="text-[11px] text-center text-[#AAB8CA] leading-snug">
                A mensagem será enviada pronta com todos os itens, quantidades e cálculos para o WhatsApp da barbearia.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
