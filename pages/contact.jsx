import { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Head from 'next/head';
import Image from 'next/image';
import {
    MapPinIcon,
    EnvelopeIcon,
    PhoneIcon,
    ClockIcon,
    GlobeAltIcon,
    ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const contactInfo = [
    {
        icon: MapPinIcon,
        title: 'Our Location',
        details: ['Jl. Raya Ubud, Gianyar', 'Bali, Indonesia 80571'],
        color: 'bg-rose-50',
        iconColor: 'text-rose-600',
    },
    {
        icon: EnvelopeIcon,
        title: 'Email Us',
        details: ['info@henartdesign.com', 'order@henartdesign.com'],
        links: ['mailto:info@henartdesign.com', 'mailto:order@henartdesign.com'],
        color: 'bg-blue-50',
        iconColor: 'text-blue-600',
    },
    {
        icon: PhoneIcon,
        title: 'Call / WhatsApp',
        details: ['+62 812-4603-4451', '+62 812-4603-4451'],
        links: ['tel:+6281246034451', 'https://wa.me/6281246034451'],
        labels: ['Phone', 'WhatsApp'],
        color: 'bg-emerald-50',
        iconColor: 'text-emerald-600',
    },
    {
        icon: ClockIcon,
        title: 'Business Hours',
        details: ['Monday – Saturday: 09:00 – 18:00', 'Sunday: Closed'],
        color: 'bg-amber-50',
        iconColor: 'text-amber-600',
    },
];

const socialLinks = [
    {
        name: 'Instagram',
        href: 'https://instagram.com/henartdesign',
        icon: (props) => (
            <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.047-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 2.377c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
            </svg>
        ),
    },
    {
        name: 'Facebook',
        href: 'https://facebook.com/henartdesign',
        icon: (props) => (
            <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
        ),
    },
    {
        name: 'WhatsApp',
        href: 'https://wa.me/6281246034451',
        icon: (props) => (
            <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
        ),
    },
];

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [sending, setSending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);

        // Create WhatsApp message from form data
        const waMessage = `Hello Henart Design!%0A%0AName: ${formData.name}%0AEmail: ${formData.email}%0ASubject: ${formData.subject}%0A%0AMessage:%0A${formData.message}`;
        window.open(`https://wa.me/6281246034451?text=${waMessage}`, '_blank');

        toast.success('Redirecting to WhatsApp...');
        setSending(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <Layout>
            <Head>
                <title>Contact Us - Henart Design | Get in Touch</title>
                <meta name="description" content="Contact Henart Design for custom orders, inquiries, or collaborations. Visit our studio in Bali or reach us via WhatsApp, email, or phone." />
            </Head>

            {/* Hero */}
            <section className="relative py-28 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full blur-3xl opacity-10 animate-pulse"></div>

                <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
                        <ChatBubbleLeftRightIcon className="h-4 w-4" />
                        Get in Touch
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                        Contact{' '}
                        <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                            Us
                        </span>
                    </h1>
                    <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
                        Have a question or want to place a custom order? We'd love to hear from you.
                        Reach out and we'll get back to you as soon as possible.
                    </p>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-16 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactInfo.map((info, index) => (
                            <div
                                key={index}
                                className="group p-6 rounded-2xl bg-white border border-gray-100 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className={`inline-flex p-3 rounded-xl ${info.color} mb-4`}>
                                    <info.icon className={`h-6 w-6 ${info.iconColor}`} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">{info.title}</h3>
                                <div className="space-y-1">
                                    {info.details.map((detail, i) => (
                                        <div key={i}>
                                            {info.links && info.links[i] ? (
                                                <a
                                                    href={info.links[i]}
                                                    target={info.links[i].startsWith('http') ? '_blank' : '_self'}
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-gray-600 hover:text-primary-600 transition-colors flex items-center gap-1"
                                                >
                                                    {info.labels && info.labels[i] && (
                                                        <span className="text-xs font-medium text-gray-400">{info.labels[i]}:</span>
                                                    )}
                                                    {detail}
                                                </a>
                                            ) : (
                                                <p className="text-sm text-gray-600">{detail}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Map & Contact Form */}
            <section className="py-20 bg-gray-50">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Google Map */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Us</h2>
                                <p className="text-gray-600">Visit our studio and showroom in the heart of Bali</p>
                            </div>
                            <div className="relative w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.6543210000004!2d115.26270000000001!3d-8.5069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2234560000001%3A0x1234567890abcdef!2sUbud%2C%20Gianyar%20Regency%2C%20Bali!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Henart Design Location"
                                    className="absolute inset-0"
                                ></iframe>
                            </div>

                            {/* Social Media */}
                            <div className="bg-white rounded-2xl p-6 shadow-soft">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Follow Us</h3>
                                <div className="flex gap-4">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors group"
                                        >
                                            <social.icon className="h-5 w-5 text-gray-600 group-hover:text-primary-600 transition-colors" />
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors hidden sm:inline">{social.name}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
                            <p className="text-gray-600 mb-8">Fill out the form below and we'll redirect you to WhatsApp</p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            id="contact-name"
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50 transition-all hover:bg-white"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            id="contact-email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50 transition-all hover:bg-white"
                                            placeholder="you@email.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        id="contact-subject"
                                        type="text"
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50 transition-all hover:bg-white"
                                        placeholder="How can we help?"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        rows={5}
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50 transition-all hover:bg-white resize-none"
                                        placeholder="Tell us about your inquiry..."
                                    ></textarea>
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full"
                                    isLoading={sending}
                                    disabled={sending}
                                >
                                    <Image src="/Gambar/wa.svg" alt="WhatsApp" width={20} height={20} className="mr-2" />
                                    {sending ? 'Sending...' : 'Send via WhatsApp'}
                                </Button>

                                <p className="text-xs text-gray-500 text-center">
                                    By submitting this form, you'll be redirected to WhatsApp to continue the conversation.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
