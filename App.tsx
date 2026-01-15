
import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Instagram, Facebook, Twitter, Phone, MapPin, ChevronRight, Minus, Plus, Trash2 } from 'lucide-react';
import { Product, CartItem, OrderDetails } from './types';
import { products } from './data';

// --- Context ---
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

// --- Components ---

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-bakery-brown tracking-tighter flex items-center">
              <span className="font-serif">LAPIS</span>
              <span className="bg-bakery-primary text-white px-2 py-0.5 ml-1 text-sm rounded">MALANG</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-bakery-primary transition-colors">Home</Link>
            <Link to="/products" className="text-gray-600 hover:text-bakery-primary transition-colors">Cakes</Link>
            <Link to="/about" className="text-gray-600 hover:text-bakery-primary transition-colors">Our Story</Link>
            <Link to="/cart" className="relative text-gray-600 hover:text-bakery-primary transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4 shadow-xl">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-lg text-gray-700">Home</Link>
          <Link to="/products" onClick={() => setIsOpen(false)} className="block text-lg text-gray-700">Cakes</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block text-lg text-gray-700">Our Story</Link>
          <Link to="/cart" onClick={() => setIsOpen(false)} className="flex items-center text-lg text-gray-700">
            <ShoppingCart className="w-5 h-5 mr-2" /> Cart ({totalItems})
          </Link>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-bakery-brown text-white pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-gray-700 pb-12">
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-2xl font-serif font-bold mb-4">Lapis Malang</h3>
          <p className="text-gray-300 leading-relaxed">Crafting premium layer cakes since 1982. Authentic taste, premium ingredients, and shared happiness in every slice.</p>
        </div>
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
          <ul className="space-y-4 text-gray-300">
            <li><Link to="/" className="hover:text-bakery-primary">Home</Link></li>
            <li><Link to="/products" className="hover:text-bakery-primary">Product List</Link></li>
            <li><Link to="/about" className="hover:text-bakery-primary">Our Story</Link></li>
            <li><Link to="/cart" className="hover:text-bakery-primary">Your Cart</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
          <ul className="space-y-4 text-gray-300">
            <li className="flex items-center"><MapPin className="w-5 h-5 mr-3 text-bakery-primary" /> Malang, East Java, Indonesia</li>
            <li className="flex items-center"><Phone className="w-5 h-5 mr-3 text-bakery-primary" /> +62 341 123 456</li>
            <li className="flex items-center text-bakery-primary font-bold">hello@lapismalang.com</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-wider text-sm">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-bakery-primary transition-all"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-bakery-primary transition-all"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-bakery-primary transition-all"><Twitter className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Lapis Malang Bakery. All rights reserved.
      </div>
    </div>
  </footer>
);

// --- Pages ---

const Home: React.FC = () => (
  <div className="space-y-20 pb-20">
    {/* Hero Section */}
    <section className="relative h-[600px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover brightness-50"
          alt="Bakery Hero"
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">Every Layer Tells a Story.</h1>
          <p className="text-xl mb-10 text-gray-200">Indulge in the authentic softness of Malang's most beloved premium layer cakes. Baked fresh daily with heritage recipes.</p>
          <Link 
            to="/products" 
            className="inline-block bg-bakery-primary hover:bg-amber-600 text-white px-10 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-bakery-primary/30 text-lg"
          >
            Order Now
          </Link>
        </div>
      </div>
    </section>

    {/* Featured Categories */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-bakery-brown mb-4">Our Signature Selection</h2>
        <p className="text-gray-600 max-w-xl mx-auto">From traditional favorites to modern fusions, explore the taste of excellence.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.slice(0, 3).map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="group relative overflow-hidden rounded-2xl aspect-[4/5]">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
              <span className="text-bakery-primary font-bold tracking-widest text-xs uppercase mb-2">{product.category}</span>
              <h3 className="text-white text-2xl font-bold mb-2">{product.name}</h3>
              <p className="text-gray-300 text-sm line-clamp-2">{product.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>

    {/* Why Choose Us */}
    <section className="bg-bakery-primary/10 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <img src="https://picsum.photos/seed/bakery-art/800/600" className="rounded-3xl shadow-2xl" alt="Bakery Process" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-bakery-brown mb-8">What Makes Us Special</h2>
            <div className="space-y-8">
              <div className="flex">
                <div className="bg-bakery-primary p-3 rounded-2xl mr-4 h-fit text-white">
                  <ChevronRight />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Authentic Heritage Recipes</h4>
                  <p className="text-gray-600">Passed down through generations, ensuring that classic Lapis Malang taste you remember.</p>
                </div>
              </div>
              <div className="flex">
                <div className="bg-bakery-primary p-3 rounded-2xl mr-4 h-fit text-white">
                  <ChevronRight />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Premium Ingredients Only</h4>
                  <p className="text-gray-600">We use high-quality butter, fresh eggs, and premium cocoa to guarantee texture and flavor.</p>
                </div>
              </div>
              <div className="flex">
                <div className="bg-bakery-primary p-3 rounded-2xl mr-4 h-fit text-white">
                  <ChevronRight />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Baked Daily Freshness</h4>
                  <p className="text-gray-600">Every cake is baked on the day of delivery to ensure the softest and most aromatic experience.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const ProductList: React.FC = () => {
  const { addToCart } = useCart();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
        <h1 className="text-4xl font-bold text-bakery-brown">Explore Our Cakes</h1>
        <p className="text-gray-500 mt-2 md:mt-0">{products.length} delicious options available</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group flex flex-col">
            <Link to={`/product/${product.id}`} className="relative overflow-hidden aspect-square">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-bakery-brown shadow-sm uppercase tracking-wider">{product.category}</span>
              </div>
            </Link>
            <div className="p-6 flex-grow flex flex-col">
              <Link to={`/product/${product.id}`}>
                <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-bakery-primary transition-colors">{product.name}</h3>
              </Link>
              <p className="text-gray-500 text-sm line-clamp-2 mb-6 flex-grow">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-bakery-brown">Rp {product.price.toLocaleString()}</span>
                <button 
                  onClick={() => addToCart(product)}
                  className="bg-bakery-primary hover:bg-bakery-brown text-white p-3 rounded-2xl transition-all active:scale-95"
                  title="Add to Cart"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="h-96 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-bakery-brown mb-4">Product not found</h2>
        <Link to="/products" className="text-bakery-primary underline">Back to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div className="rounded-3xl overflow-hidden shadow-2xl">
          <img src={product.image} alt={product.name} className="w-full h-auto aspect-square object-cover" />
        </div>
        <div className="pt-4">
          <span className="inline-block bg-bakery-primary/20 text-bakery-brown font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            {product.category}
          </span>
          <h1 className="text-5xl font-bold text-bakery-brown mb-6">{product.name}</h1>
          <p className="text-3xl font-light text-gray-800 mb-8 border-b border-gray-100 pb-8">Rp {product.price.toLocaleString()}</p>
          
          <div className="mb-8">
            <h4 className="font-bold text-gray-800 mb-2">Description</h4>
            <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 items-center">
            <div className="flex items-center border-2 border-gray-100 rounded-full overflow-hidden w-full sm:w-auto">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="p-4 hover:bg-gray-50 text-gray-400 hover:text-bakery-brown"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="w-12 text-center font-bold text-xl">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="p-4 hover:bg-gray-50 text-gray-400 hover:text-bakery-brown"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <button 
              onClick={handleAddToCart}
              className="w-full sm:flex-grow bg-bakery-brown hover:bg-black text-white px-8 py-4 rounded-full font-bold transition-all shadow-xl text-lg flex items-center justify-center"
            >
              <ShoppingCart className="w-5 h-5 mr-3" /> Add to Cart
            </button>
          </div>

          <div className="mt-12 p-6 bg-bakery-warm rounded-3xl border border-bakery-primary/20">
            <h5 className="font-bold text-bakery-brown mb-2 flex items-center">
              <MapPin className="w-4 h-4 mr-2" /> Local Delivery Only
            </h5>
            <p className="text-sm text-gray-600">Standard delivery available for Malang & Batu area. Next day delivery for orders placed before 3 PM.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <ShoppingCart className="w-20 h-20 mx-auto text-gray-200 mb-6" />
        <h2 className="text-3xl font-bold text-bakery-brown mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-10">Look like you haven't added any treats yet!</p>
        <Link to="/products" className="bg-bakery-primary text-white px-10 py-4 rounded-full font-bold shadow-lg">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-bakery-brown mb-12">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-2xl mr-6" />
              <div className="flex-grow">
                <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                <p className="text-bakery-brown font-medium">Rp {item.price.toLocaleString()}</p>
                <div className="flex items-center mt-3">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-1 text-gray-400 hover:text-bakery-primary"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="mx-4 font-bold">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-1 text-gray-400 hover:text-bakery-primary"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg mb-2">Rp {(item.price * item.quantity).toLocaleString()}</p>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 hover:text-red-600 p-2"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-fit sticky top-28">
          <h3 className="text-xl font-bold mb-6">Order Summary</h3>
          <div className="space-y-4 mb-6 border-b border-gray-100 pb-6">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>Rp {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Estimated Delivery</span>
              <span className="text-green-500 font-medium">Free</span>
            </div>
          </div>
          <div className="flex justify-between text-2xl font-bold text-bakery-brown mb-8">
            <span>Total</span>
            <span>Rp {subtotal.toLocaleString()}</span>
          </div>
          <Link to="/checkout" className="block w-full bg-bakery-primary text-white text-center py-4 rounded-full font-bold shadow-lg hover:bg-bakery-brown transition-all">
            Proceed to Checkout
          </Link>
          <p className="text-xs text-center text-gray-400 mt-4">Safe and secure payment gateway placeholder</p>
        </div>
      </div>
    </div>
  );
};

const Checkout: React.FC = () => {
  const { subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 4000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="bg-green-100 text-green-600 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <ChevronRight className="w-12 h-12" />
        </div>
        <h2 className="text-4xl font-bold text-bakery-brown mb-4">Order Successful!</h2>
        <p className="text-gray-500 text-lg">Thank you for your purchase. We're preparing your Lapis Malang fresh!</p>
        <p className="text-sm text-gray-400 mt-8 italic">Redirecting you to home...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-bakery-brown mb-12">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h3 className="text-2xl font-bold mb-8">Shipping Information</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input required type="text" className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-bakery-primary outline-none" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input required type="tel" className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-bakery-primary outline-none" placeholder="+62..." />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input required type="email" className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-bakery-primary outline-none" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Address</label>
              <textarea required rows={4} className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-bakery-primary outline-none" placeholder="Street name, District, City..."></textarea>
            </div>
            
            <div className="pt-8">
              <h3 className="text-2xl font-bold mb-6">Payment Method</h3>
              <div className="p-6 bg-bakery-warm rounded-2xl border border-bakery-primary/30 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-bakery-primary w-12 h-8 rounded-md mr-4 shadow-sm"></div>
                  <span className="font-bold text-bakery-brown">Bank Transfer (Manual Confirmation)</span>
                </div>
                <div className="w-5 h-5 rounded-full border-4 border-bakery-primary"></div>
              </div>
            </div>

            <button type="submit" className="w-full bg-bakery-brown text-white py-5 rounded-full font-bold text-xl shadow-xl hover:bg-black transition-all">
              Place Order - Rp {subtotal.toLocaleString()}
            </button>
          </form>
        </div>

        <div className="hidden lg:block">
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 h-fit">
            <h3 className="text-2xl font-bold mb-8">Order Highlights</h3>
            <div className="space-y-6 mb-8">
              {/* Simplified preview */}
              <div className="flex justify-between text-gray-600 pb-4 border-b border-gray-50">
                <span>Items Subtotal</span>
                <span className="font-bold text-bakery-brown">Rp {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600 pb-4 border-b border-gray-50">
                <span>Shipping & Handling</span>
                <span className="text-green-500 font-bold uppercase text-sm tracking-tighter">Complimentary</span>
              </div>
              <div className="flex justify-between text-3xl font-bold text-bakery-brown pt-4">
                <span>Final Total</span>
                <span>Rp {subtotal.toLocaleString()}</span>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-gray-500 italic">"Layers of joy, delivered straight to your doorstep."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const About: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32">
      <div>
        <h1 className="text-5xl font-bold text-bakery-brown mb-8">The Heart of Malang's Layer Cakes</h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          Founded in the cool Highlands of Malang in 1982, Lapis Malang began as a small family bakery with a big dream: to create the world's most delicate, aromatic, and flavorful layer cake.
        </p>
        <p className="text-gray-600 text-lg leading-relaxed">
          Today, we remain committed to our heritage while embracing innovation. Our master bakers still hand-select every egg and whisk every batter by hand, ensuring that every box of Lapis Malang carries the same warmth and quality that started it all decades ago.
        </p>
      </div>
      <div className="relative">
        <img src="https://picsum.photos/seed/bakery-story/800/1000" className="rounded-[40px] shadow-2xl" alt="Bakery Heritage" />
        <div className="absolute -bottom-10 -left-10 bg-bakery-primary p-10 rounded-3xl text-white shadow-xl hidden md:block">
          <span className="text-6xl font-serif font-bold block mb-2">40+</span>
          <span className="text-sm uppercase tracking-widest font-bold">Years of Baking Love</span>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
      <div className="p-10 bg-white rounded-3xl shadow-sm border border-gray-50">
        <h4 className="text-2xl font-bold text-bakery-brown mb-4">Our Mission</h4>
        <p className="text-gray-600">To preserve the culinary heritage of Malang by providing premium layer cakes that connect people and celebrate special moments.</p>
      </div>
      <div className="p-10 bg-white rounded-3xl shadow-sm border border-gray-50">
        <h4 className="text-2xl font-bold text-bakery-brown mb-4">Our Quality</h4>
        <p className="text-gray-600">We never compromise. From zero-preservatives to Grade A butter, our standards are as high as our layers are thin.</p>
      </div>
      <div className="p-10 bg-white rounded-3xl shadow-sm border border-gray-50">
        <h4 className="text-2xl font-bold text-bakery-brown mb-4">Our Community</h4>
        <p className="text-gray-600">Supporting local farmers and producers in East Java, we believe in growing together with our community.</p>
      </div>
    </div>
  </div>
);

// --- Provider ---

const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const totalItems = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);
  const subtotal = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};

// --- App Root ---

const App: React.FC = () => {
  return (
    <CartProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </CartProvider>
  );
};

export default App;
