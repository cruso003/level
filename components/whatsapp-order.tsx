// components/whatsapp-order.tsx
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/config';

interface WhatsAppOrderButtonProps {
  product: {
    name: string;
    price?: string;
    color?: string;
    size?: string;
    placement?: string;
  };
  buttonText?: string;
  className?: string;
}

export function WhatsAppOrderButton({ 
  product, 
  buttonText = "Order via WhatsApp",
  className = "bg-indigo-600 hover:bg-indigo-700" 
}: WhatsAppOrderButtonProps) {
  const handleWhatsAppOrder = () => {
    const phone = siteConfig.whatsappNumber;
    
    let message = `Hello! I'm interested in ${product.name}`;
    
    // Only add these details if they exist (for product orders)
    if (product.price) message += ` (${product.price})`;
    if (product.color) message += `, in color: ${product.color}`;
    if (product.size) message += `, size: ${product.size}`;
    if (product.placement) message += `, with design placement: ${product.placement}`;
    
    // For general inquiries or custom requests
    message += `. I'd like to discuss this further.`;
    
    const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <Button 
      onClick={handleWhatsAppOrder} 
      size="lg"
      className={className}
    >
      {buttonText}
    </Button>
  );
}
