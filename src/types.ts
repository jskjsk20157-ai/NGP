export interface CalendarEvent {
  id: string;
  date: string;
  title: string;
  location: string;
  type: 'conference' | 'seminar' | 'meeting';
}

export interface ContactFormData {
  name: string;
  hospital: string;
  contact: string;
  type: 'join' | 'interview' | 'support';
  message: string;
}
