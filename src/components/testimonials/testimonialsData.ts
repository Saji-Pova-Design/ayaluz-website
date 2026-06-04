export interface Testimonial {
    id: number
    name: string
    from: string
    event: string
    title: string
    text: string
    image: string
  }
  
  export const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Michael R.',
      from: 'California, USA',
      event: '7 Day Healing Retreat',
      title: 'A deep sense of connection',
      text:
        'My time at AyaLuz left a lasting impression and profoundly changed my life.',
      image: '/images/testimonials/person-1.jpg',
    },
  
    {
      id: 2,
      name: 'Sophia L.',
      from: 'Berlin, Germany',
      event: 'Sacred Valley Ceremony',
      title: 'Healing beyond expectations',
      text:
        'The ceremonies were held with so much love and integrity. I felt safe and deeply transformed.',
      image: '/images/testimonials/person-2.jpg',
    },
  
    {
      id: 3,
      name: 'Daniel M.',
      from: 'Sydney, Australia',
      event: 'Ayahuasca Journey',
      title: 'Profound inner clarity',
      text:
        'AyaLuz gave me clarity and peace that I had been searching for for years.',
      image: '/images/testimonials/person-3.jpg',
    },
  ]