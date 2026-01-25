import type { ContactMethodData } from '@/types/models';
import { Mail, MessageSquare, Phone, MapPin } from 'lucide-react';

/**
 * Contact methods
 */
export const contactMethods: ContactMethodData[] = [
  {
    icon: Mail,
    title: 'Email',
    value: 'hello@qaai.com',
    link: 'mailto:hello@qaai.com',
  },
  {
    icon: MessageSquare,
    title: 'Live Chat',
    value: 'Available Mon-Fri, 9am-6pm PT',
    link: '#',
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+1 (555) 123-4567',
    link: 'tel:+15551234567',
  },
  {
    icon: MapPin,
    title: 'Office',
    value: '123 Tech Street, San Francisco, CA 94105',
    link: '#',
  },
];
