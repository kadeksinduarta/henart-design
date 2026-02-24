import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';
import Accordion from '../components/Accordion';
import { api, getStorageUrl } from '../lib/api';
import { SparklesIcon, HeartIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [articles, setArticles] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsRes, articlesRes, faqsRes] = await Promise.all([
        api.get('/products?limit=3').catch(() => ({ data: { data: [] } })),
        api.get('/articles?limit=3&status=published').catch(() => ({ data: { data: [] } })),
        api.get('/faqs').catch(() => ({ data: { data: [] } }))
      ]);

      setProducts(Array.isArray(productsRes.data.data) ? productsRes.data.data : []);
      const articlesData = articlesRes.data.data?.data || articlesRes.data.data;
      setArticles(Array.isArray(articlesData) ? articlesData : []);
      setFaqs(Array.isArray(faqsRes.data.data) ? faqsRes.data.data : []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setProducts([]);
      setArticles([]);
      setFaqs([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
                <SparklesIcon className="h-4 w-4" />
                Eco-Friendly Art
              </div>
              <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
                <span className="block">Henart Design</span>
                <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mt-2">
                  Crafting Beauty
                </span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto lg:mx-0">
                Transforming discarded materials into stunning eco-friendly art pieces.
                Each creation tells a story of sustainability and creativity.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Button size="lg" as={Link} href="#products">
                  View Products
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" as={Link} href="/about">
                  Know More
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/Gambar/Bg-utama.svg"
                  alt="Henart Design Products"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full blur-3xl opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Products Section */}
      <section id="products" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Products
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Discover our collection of handcrafted eco-friendly art pieces
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-64 rounded-2xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Card
                  key={product.id}
                  title={product.name}
                  description={product.description}
                  image={product.image ? getStorageUrl(product.image) : `/Gambar/product/product (${((product.id || 1) % 8) + 1}).svg`}
                  href={`/products/${product.slug}`}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" as={Link} href="/products">
              View All Products
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Crafting Beauty from Waste Section */}
      <section className="py-24 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl order-2 lg:order-1">
              <Image
                src="/Gambar/logo-about.svg"
                alt="Crafting Process"
                fill
                className="object-contain p-8 bg-white"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-soft text-primary-700 text-sm font-medium mb-6">
                <HeartIcon className="h-4 w-4" />
                Our Mission
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
                Crafting Beauty from Waste
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  At Henart Design, we believe that beauty can be found in the most unexpected places.
                  Our artisans transform discarded materials into stunning works of art, giving new life
                  to what others might consider waste.
                </p>
                <p>
                  Each piece is carefully handcrafted with attention to detail, combining traditional
                  techniques with modern design aesthetics. We're not just creating art – we're making
                  a statement about sustainability and the endless possibilities of creative reuse.
                </p>
                <p>
                  Join us in our mission to reduce waste while creating beautiful, meaningful pieces
                  that tell a story of transformation and hope for a more sustainable future.
                </p>
              </div>
              <div className="mt-8">
                <Button size="lg" as={Link} href="/about">
                  Learn More About Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blogs Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Latest Blogs
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Stories, insights, and inspiration from our journey
              </p>
            </div>
            <Link href="/blog" className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2 group">
              View All
              <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-64 rounded-2xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Card
                  key={article.id}
                  title={article.title}
                  description={article.excerpt}
                  image={article.thumbnail ? getStorageUrl(article.thumbnail) : `/Gambar/product/product (${((article.id || 1) % 8) + 1}).svg`}
                  href={`/blog/${article.slug}`}
                  badge={article.category?.name}
                >
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <time dateTime={article.published_at}>
                      {new Date(article.published_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                    <span className="mx-2">•</span>
                    <span>{article.author?.name || 'Admin'}</span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-gray-50">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Everything you need to know about our products and services
            </p>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse bg-white rounded-xl p-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : faqs.length > 0 ? (
            <Accordion items={faqs} />
          ) : (
            <div className="text-center text-gray-500">
              <p>No FAQs available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
