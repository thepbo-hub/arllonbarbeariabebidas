import React, { useEffect } from 'react';
import { X, Shield, FileText, Cookie, AlertCircle, Mail, Building2, UserCheck } from 'lucide-react';

export type LegalModalType = 'privacy' | 'terms' | 'cookies' | null;

interface LegalModalProps {
  type: LegalModalType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (type) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [type, onClose]);

  if (!type) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#04172B]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
    >
      <div
        className="relative w-full max-w-4xl bg-[#0B2340] border border-[#1687FF]/30 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(4,23,43,0.95)] flex flex-col my-auto max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#082E5A]/70">
          <div className="flex items-center gap-2.5">
            {type === 'privacy' && <Shield className="w-5 h-5 text-[#42C8FF]" aria-hidden="true" />}
            {type === 'terms' && <FileText className="w-5 h-5 text-[#42C8FF]" aria-hidden="true" />}
            {type === 'cookies' && <Cookie className="w-5 h-5 text-[#42C8FF]" aria-hidden="true" />}
            <h2 id="legal-modal-title" className="text-lg font-bold text-white uppercase tracking-wide">
              {type === 'privacy' && 'Política de Privacidade (LGPD)'}
              {type === 'terms' && 'Termos de Uso do Catálogo'}
              {type === 'cookies' && 'Política de Cookies'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar janela"
            className="w-9 h-9 rounded-xl bg-[#04172B] hover:bg-[#1687FF]/20 border border-white/10 text-[#AAB8CA] hover:text-white flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1687FF]"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Body / Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 text-sm text-[#AAB8CA] leading-relaxed space-y-6">
          {/* Quick Notice about informative prices/status */}
          <div className="p-4 rounded-xl bg-[#082E5A]/40 border border-[#1687FF]/20 flex items-start gap-3 text-xs text-[#F5F8FC]">
            <AlertCircle className="w-4 h-4 text-[#42C8FF] shrink-0 mt-0.5" aria-hidden="true" />
            <p>
              <strong>Aviso Importante:</strong> Todos os preços, itens do cardápio, disponibilidade e horários de funcionamento apresentados neste catálogo são de caráter estritamente informativo. A confirmação do pedido, disponibilidade física de estoque e pagamento são formalizados diretamente com a equipe da barbearia via WhatsApp ou presencialmente.
            </p>
          </div>

          {type === 'privacy' && <PrivacyContent />}
          {type === 'terms' && <TermsContent />}
          {type === 'cookies' && <CookiesContent />}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#082E5A]/60 flex items-center justify-between flex-wrap gap-3">
          <span className="text-xs text-[#AAB8CA]">
            Última atualização: <strong>30 de outubro de 2026</strong>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="btn-3d-primary px-6 py-2 text-xs font-bold text-white uppercase tracking-wider"
          >
            Entendido e Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

/* Content Component 1: Privacy Policy */
const PrivacyContent: React.FC = () => (
  <div className="space-y-4">
    <div className="p-4 rounded-xl bg-[#04172B]/80 border border-white/10">
      <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
        <Building2 className="w-4 h-4 text-[#42C8FF]" aria-hidden="true" />
        Dados do Controlador de Dados (Para Preenchimento do Proprietário):
      </h3>
      <ul className="text-xs space-y-1 text-[#AAB8CA]">
        <li>• <strong>Nome da Empresa / Razão Social:</strong> [Preencher: ARLLON FERNANDES BARBEARIA LTDA / Arllon Fernandes]</li>
        <li>• <strong>CNPJ / CPF:</strong> [Preencher: 00.000.000/0001-00 ou CPF do responsável]</li>
        <li>• <strong>Endereço Comercial:</strong> [Preencher: Endereço completo da barbearia]</li>
        <li>• <strong>E-mail de Contato e Encarregado (DPO / LGPD):</strong> [Preencher: contato@arllonfernandes.com.br / privacidade@arllonfernandes.com.br]</li>
      </ul>
    </div>

    <section className="space-y-2">
      <h3 className="text-base font-bold text-white">1. Nosso Compromisso com a LGPD (Lei nº 13.709/2018)</h3>
      <p>
        A ARLLON FERNANDES BARBEARIA respeita rigorosamente a privacidade e a segurança dos dados de seus clientes. Esta política explica, de maneira clara e transparente, como lidamos com as informações durante a navegação em nosso catálogo digital de bebidas.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="text-base font-bold text-white">2. Princípio da Minimização: Quais Dados Coletamos?</h3>
      <p>
        Este catálogo digital foi arquitetado sob o conceito de <em>Privacy by Design</em> (privacidade desde a concepção) e minimização de dados:
      </p>
      <ul className="list-disc pl-5 space-y-1 text-xs">
        <li><strong>Navegação sem cadastro:</strong> Não exigimos criação de conta, login, senha, CPF, cartão de crédito ou preenchimento prévio de formulários de dados pessoais para explorar o cardápio.</li>
        <li><strong>Carrinho de compras temporário:</strong> Os itens, quantidades e versões selecionadas ficam gravados exclusivamente na memória do seu próprio navegador (armazenamento de sessão - <code>sessionStorage</code>) e são descartados automaticamente ao fechar o biosite ou ao clicar em finalizar pedido.</li>
        <li><strong>Envio de mensagem via WhatsApp:</strong> Ao clicar em "Finalizar Pedido via WhatsApp", o catálogo gera uma mensagem de texto e direciona você ao aplicativo oficial do WhatsApp. Nós não armazenamos seu número de telefone nem sua conversa no servidor deste site.</li>
      </ul>
    </section>

    <section className="space-y-2">
      <h3 className="text-base font-bold text-white">3. Serviços e Recursos de Terceiros Utilizados</h3>
      <p>Para fornecer uma experiência moderna e cinematográfica, este site conecta-se estritamente aos seguintes serviços externos:</p>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border border-white/10 rounded-lg overflow-hidden">
          <thead className="bg-[#082E5A] text-white">
            <tr>
              <th className="p-2.5">Serviço / Provedor</th>
              <th className="p-2.5">Finalidade</th>
              <th className="p-2.5">Dados Coletados / Política</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr>
              <td className="p-2.5 font-semibold text-white">WhatsApp (Meta Inc.)</td>
              <td className="p-2.5">Canal de comunicação direta para envio da mensagem do pedido.</td>
              <td className="p-2.5">Sujeito à política de privacidade do WhatsApp ao abrir o aplicativo.</td>
            </tr>
            <tr>
              <td className="p-2.5 font-semibold text-white">Postimages / ImgBB (CDN)</td>
              <td className="p-2.5">Hospedagem e distribuição das fotos e logos dos produtos.</td>
              <td className="p-2.5">Endereço IP e user-agent na requisição HTTP padrão da imagem.</td>
            </tr>
            <tr>
              <td className="p-2.5 font-semibold text-white">YourImageShare (CDN de Vídeos)</td>
              <td className="p-2.5">Hospedagem e streaming dos vídeos de apresentação das bebidas.</td>
              <td className="p-2.5">Endereço IP e user-agent na requisição do arquivo de mídia.</td>
            </tr>
            <tr>
              <td className="p-2.5 font-semibold text-white">Google Fonts (Tipografia)</td>
              <td className="p-2.5">Carregamento das fontes tipográficas Outfit e Plus Jakarta Sans.</td>
              <td className="p-2.5">Requisição de fontes ao Google (IP e navegador).</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs text-[#AAB8CA] mt-1">
        Não comercializamos, não compartilhamos e não transferimos dados para corretores de dados (data brokers) ou empresas de publicidade direcionada.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="text-base font-bold text-white">4. Canal Direto para Direitos do Titular de Dados</h3>
      <p>
        Em conformidade com o artigo 18 da LGPD, você pode exercer a qualquer momento seus direitos de confirmação de existência de tratamento, acesso, correção, eliminação, portabilidade ou revogação de consentimento.
      </p>
      <div className="p-3.5 rounded-xl bg-[#04172B] border border-[#1687FF]/30 flex items-center gap-3">
        <UserCheck className="w-5 h-5 text-[#35D49A] shrink-0" aria-hidden="true" />
        <div className="text-xs">
          <p className="text-white font-bold">Canal do Titular / Encarregado (DPO):</p>
          <p className="text-[#AAB8CA]">Envie uma solicitação com o assunto "LGPD - Direitos do Titular" para o e-mail: <strong className="text-[#42C8FF]">[Preencher: contato@arllonfernandes.com.br]</strong> ou pelo WhatsApp oficial.</p>
        </div>
      </div>
    </section>
  </div>
);

/* Content Component 2: Terms of Use */
const TermsContent: React.FC = () => (
  <div className="space-y-4">
    <div className="p-4 rounded-xl bg-[#04172B]/80 border border-white/10">
      <h3 className="text-sm font-bold text-white mb-2">Identificação do Estabelecimento:</h3>
      <ul className="text-xs space-y-1 text-[#AAB8CA]">
        <li>• <strong>Estabelecimento:</strong> ARLLON FERNANDES BARBEARIA</li>
        <li>• <strong>Responsável Legal:</strong> [Preencher: Arllon Fernandes / Razão Social]</li>
        <li>• <strong>CNPJ/CPF:</strong> [Preencher: 00.000.000/0001-00]</li>
        <li>• <strong>Atendimento:</strong> Presencial ou via WhatsApp oficial</li>
      </ul>
    </div>

    <section className="space-y-2">
      <h3 className="text-base font-bold text-white">1. Objeto do Catálogo Digital</h3>
      <p>
        Este site destina-se a apresentar de forma interativa e visual o cardápio de bebidas disponíveis para consumo durante ou após o atendimento na barbearia. Não se trata de uma loja virtual com checkout bancário online, mas sim de uma ferramenta de pré-seleção e conveniência para o cliente.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="text-base font-bold text-white">2. Preços, Estoque e Disponibilidade Informativa</h3>
      <p>
        Os preços em reais (R$) informados correspondem aos valores unitários vigentes no balcão da barbearia. Embora mantenhamos as informações atualizadas, a disponibilidade de itens em geladeira pode variar conforme o fluxo diário de atendimento. A confirmação definitiva da bebida escolhida ocorre no momento do atendimento presencial ou na confirmação da mensagem do WhatsApp.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="text-base font-bold text-white">3. Propriedade Intelectual e Marcas Registradas</h3>
      <p>
        O logotipo oficial, design e elementos exclusivos de identidade visual são de propriedade da ARLLON FERNANDES BARBEARIA. As marcas comerciais, logotipos e embalagens das bebidas (como Coca-Cola®, Red Bull®, Monster Energy®, Guaraná Antarctica®, entre outras) pertencem exclusivamente aos seus respectivos titulares e fabricantes, sendo exibidas unicamente para identificar com fidelidade e autenticidade os produtos originais comercializados no estabelecimento.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="text-base font-bold text-white">4. Uso Adequado e Segurança</h3>
      <p>
        É proibido utilizar métodos automatizados (crawlers, bots ou engenharia reversa) que possam sobrecarregar a infraestrutura deste site ou comprometer a segurança da aplicação.
      </p>
    </section>
  </div>
);

/* Content Component 3: Cookie Policy */
const CookiesContent: React.FC = () => (
  <div className="space-y-4">
    <section className="space-y-2">
      <h3 className="text-base font-bold text-white">1. O que são Cookies?</h3>
      <p>
        Cookies e tecnologias de armazenamento local (como <em>Session Storage</em>) são pequenos arquivos ou fragmentos de dados armazenados no seu dispositivo que permitem lembrar suas ações e preferências durante a navegação.
      </p>
    </section>

    <section className="space-y-2">
      <h3 className="text-base font-bold text-white">2. Inventário de Cookies e Armazenamentos Utilizados Neste Site</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border border-white/10 rounded-lg overflow-hidden">
          <thead className="bg-[#082E5A] text-white">
            <tr>
              <th className="p-2.5">Nome / Chave</th>
              <th className="p-2.5">Tipo / Origem</th>
              <th className="p-2.5">Duração</th>
              <th className="p-2.5">Finalidade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr>
              <td className="p-2.5 font-mono text-[#42C8FF]">barbearia_drinks_session_v1</td>
              <td className="p-2.5">Armazenamento de Sessão (1ª Parte)</td>
              <td className="p-2.5">Sessão (apagado ao fechar)</td>
              <td className="p-2.5">Armazenar temporariamente os produtos adicionados ao carrinho antes de enviar ao WhatsApp.</td>
            </tr>
            <tr>
              <td className="p-2.5 font-mono text-[#42C8FF]">barbearia_cookie_consent_v1</td>
              <td className="p-2.5">Armazenamento Local (1ª Parte)</td>
              <td className="p-2.5">Até 12 meses</td>
              <td className="p-2.5">Registrar se você aceitou ou recusou os cookies para não exibir o banner repetidamente.</td>
            </tr>
            <tr>
              <td className="p-2.5 font-mono text-[#42C8FF]">Cookies Analíticos / Pixel (Opcional)</td>
              <td className="p-2.5">Terceiros (Google/Meta)</td>
              <td className="p-2.5">Variável</td>
              <td className="p-2.5"><strong>Bloqueados por padrão.</strong> Carregados estritamente após consentimento voluntário.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section className="space-y-2">
      <h3 className="text-base font-bold text-white">3. Como Alterar ou Revogar o Consentimento</h3>
      <p>
        Você pode alterar suas preferências de cookies a qualquer momento limpando os dados do navegador ou utilizando o botão "Preferências de Cookies" no rodapé deste site. Você também pode configurar seu navegador para bloquear cookies de terceiros.
      </p>
    </section>
  </div>
);
