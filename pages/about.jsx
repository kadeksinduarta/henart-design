import { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import {
    SparklesIcon,
    HeartIcon,
    GlobeAltIcon,
    HandRaisedIcon,
    LightBulbIcon,
    ArrowRightIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';

const milestones = [
    { year: '2018', title: 'The Beginning', description: 'Henart Design was born from a passion for turning waste materials into beautiful art pieces in Bali, Indonesia.' },
    { year: '2019', title: 'First Collection', description: 'Launched our first collection of eco-friendly handcrafted products, gaining recognition in local art communities.' },
    { year: '2020', title: 'Going Online', description: 'Expanded our reach by establishing an online presence, bringing Balinese eco-art to international customers.' },
    { year: '2022', title: 'Global Recognition', description: 'Featured in international sustainable art exhibitions, receiving awards for innovation in eco-friendly design.' },
    { year: '2024', title: 'Community Impact', description: 'Empowered over 50 local artisans and recycled more than 10 tons of materials into beautiful art pieces.' },
    { year: '2026', title: 'New Chapter', description: 'Continuing to grow and innovate, bringing new designs and sustainable practices to the world.' },
];

const values = [
    {
        icon: HeartIcon,
        title: 'Passion for Craft',
        description: 'Every piece we create is infused with love and dedication, reflecting the rich cultural heritage of Balinese artistry.',
        color: 'from-rose-500 to-pink-500',
        bgColor: 'bg-rose-50',
    },
    {
        icon: GlobeAltIcon,
        title: 'Sustainability',
        description: 'We are committed to protecting our planet by transforming discarded materials into stunning works of art.',
        color: 'from-emerald-500 to-teal-500',
        bgColor: 'bg-emerald-50',
    },
    {
        icon: HandRaisedIcon,
        title: 'Community First',
        description: 'We empower local artisans, providing fair wages and opportunities while preserving traditional craftsmanship.',
        color: 'from-amber-500 to-orange-500',
        bgColor: 'bg-amber-50',
    },
    {
        icon: LightBulbIcon,
        title: 'Innovation',
        description: 'We constantly explore new techniques and materials to push the boundaries of sustainable design.',
        color: 'from-violet-500 to-purple-500',
        bgColor: 'bg-violet-50',
    },
];

const craftingProcess = [
    {
        step: '01',
        title: 'Material Collection',
        description: 'We carefully source and collect discarded materials from local communities — from wood scraps to recycled fabrics and metals.',
    },
    {
        step: '02',
        title: 'Design & Planning',
        description: 'Our designers create unique patterns and concepts, blending traditional Balinese aesthetics with contemporary design trends.',
    },
    {
        step: '03',
        title: 'Handcrafting',
        description: 'Skilled artisans meticulously transform raw materials into beautiful art pieces using time-honored techniques and modern tools.',
    },
    {
        step: '04',
        title: 'Quality Control',
        description: 'Every piece undergoes rigorous quality checks to ensure durability, beauty, and adherence to our high standards.',
    },
    {
        step: '05',
        title: 'Finishing Touch',
        description: 'Final polishing, eco-friendly coating, and careful packaging ensure each product arrives in perfect condition.',
    },
];

const stats = [
    { value: '500+', label: 'Products Created' },
    { value: '50+', label: 'Local Artisans' },
    { value: '10+', label: 'Tons Recycled' },
    { value: '30+', label: 'Countries Reached' },
];

export default function AboutPage() {
    return (
        <Layout>
            <Head>
                <title>About Us - Henart Design | Eco-Friendly Handcrafted Art from Bali</title>
                <meta name="description" content="Discover the story behind Henart Design — transforming discarded materials into stunning eco-friendly art pieces, handcrafted by local artisans in Bali, Indonesia." />
            </Head>

            {/* Hero Section */}
            <section className="relative py-32 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full blur-3xl opacity-10 animate-pulse"></div>
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-br from-secondary-300 to-primary-300 rounded-full blur-3xl opacity-10"></div>

                <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
                                <SparklesIcon className="h-4 w-4" />
                                Our Story
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                                Crafting Beauty
                                <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mt-2">
                                    From Waste
                                </span>
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                Henart Design is a Bali-based creative studio that transforms discarded materials
                                into stunning, eco-friendly art pieces. Founded with a vision to merge sustainability
                                with artistry, we believe that beauty can be found in the most unexpected places.
                            </p>
                            <p className="mt-4 text-lg leading-8 text-gray-600">
                                Each piece tells a story of transformation — from forgotten waste to cherished artwork —
                                handcrafted by skilled local artisans who pour their heart into every creation.
                            </p>
                            <div className="mt-10 flex flex-col sm:flex-row gap-4">
                                <Button size="lg" as={Link} href="/products">
                                    Explore Products
                                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                                </Button>
                                <Button variant="outline" size="lg" as={Link} href="/contact">
                                    Get in Touch
                                </Button>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/Gambar/logo-about.svg"
                                    alt="Henart Design Logo"
                                    fill
                                    className="object-contain p-12 bg-white"
                                    priority
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full blur-2xl opacity-20"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white border-y border-gray-100">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent transition-transform group-hover:scale-110 duration-300">
                                    {stat.value}
                                </div>
                                <p className="mt-2 text-sm sm:text-base text-gray-600 font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Our Core Values
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            The principles that guide everything we do at Henart Design
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="group relative p-8 rounded-2xl bg-white border border-gray-100 shadow-soft hover:shadow-hover transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className={`inline-flex p-3 rounded-xl ${value.bgColor} mb-6`}>
                                    <value.icon className="h-7 w-7 text-gray-700" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${value.color} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-600/20 to-transparent rounded-full blur-3xl"></div>

                <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16">
                        <div className="space-y-8">
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-primary-300 text-sm font-medium mb-4">
                                    <HeartIcon className="h-4 w-4" />
                                    Our Mission
                                </div>
                                <h2 className="text-3xl font-bold mb-4">Creating Art, Saving the Planet</h2>
                                <p className="text-gray-300 leading-relaxed text-lg">
                                    Our mission is to reduce waste and promote sustainability through creative design.
                                    We aim to show the world that discarded materials can be transformed into beautiful,
                                    functional art pieces that bring joy to homes and offices while making a positive
                                    impact on the environment.
                                </p>
                            </div>
                            <ul className="space-y-3">
                                {[
                                    'Transform waste into beautiful art',
                                    'Empower local artisan communities',
                                    'Promote sustainable living',
                                    'Preserve Balinese cultural heritage'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <CheckCircleIcon className="h-5 w-5 text-primary-400 flex-shrink-0" />
                                        <span className="text-gray-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-secondary-300 text-sm font-medium mb-4">
                                    <LightBulbIcon className="h-4 w-4" />
                                    Our Vision
                                </div>
                                <h2 className="text-3xl font-bold mb-4">A World Where Art Meets Sustainability</h2>
                                <p className="text-gray-300 leading-relaxed text-lg">
                                    We envision a world where sustainability and beauty coexist harmoniously.
                                    Where every piece of waste has the potential to become a masterpiece.
                                    Where communities thrive through creative reuse and traditional craftsmanship
                                    is celebrated and preserved for future generations.
                                </p>
                            </div>
                            <ul className="space-y-3">
                                {[
                                    'Lead the eco-art movement globally',
                                    'Zero-waste production by 2030',
                                    'Expand artisan network across Indonesia',
                                    'Inspire 1 million people to recycle creatively'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <CheckCircleIcon className="h-5 w-5 text-secondary-400 flex-shrink-0" />
                                        <span className="text-gray-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Crafting Process */}
            <section className="py-24 bg-gradient-to-br from-primary-50 to-secondary-50">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Our Crafting Process
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            From discarded materials to stunning works of art — see how the magic happens
                        </p>
                    </div>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-300 via-secondary-300 to-primary-300"></div>

                        <div className="space-y-12 lg:space-y-24">
                            {craftingProcess.map((process, index) => (
                                <div
                                    key={index}
                                    className={`relative flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                                        }`}
                                >
                                    <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                                        <div className="bg-white rounded-2xl shadow-soft p-8 hover:shadow-hover transition-shadow duration-300">
                                            <span className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                                                {process.step}
                                            </span>
                                            <h3 className="text-xl font-bold text-gray-900 mt-3 mb-2">
                                                {process.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">{process.description}</p>
                                        </div>
                                    </div>

                                    {/* Timeline dot */}
                                    <div className="hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 shadow-lg z-10 flex-shrink-0">
                                        <span className="text-white font-bold text-sm">{process.step}</span>
                                    </div>

                                    <div className="flex-1 hidden lg:block"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline / Milestones */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Our Journey
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            Key milestones in the Henart Design story
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {milestones.map((milestone, index) => (
                            <div
                                key={index}
                                className="group relative p-8 rounded-2xl border border-gray-100 bg-white shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all duration-300"
                            >
                                <span className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                                    {milestone.year}
                                </span>
                                <h3 className="text-xl font-bold text-gray-900 mt-3 mb-2">{milestone.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-br from-primary-600 to-secondary-600 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold sm:text-4xl mb-6">
                        Ready to Own a Piece of Sustainable Art?
                    </h2>
                    <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
                        Explore our collection and find the perfect eco-friendly art piece for your home or office.
                        Every purchase supports local artisans and the environment.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            as={Link}
                            href="/products"
                            className="bg-white !text-primary-700 hover:bg-gray-100"
                        >
                            Browse Products
                            <ArrowRightIcon className="ml-2 h-5 w-5" />
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            as={Link}
                            href="/contact"
                            className="!border-white !text-white hover:!bg-white/10"
                        >
                            Contact Us
                        </Button>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
