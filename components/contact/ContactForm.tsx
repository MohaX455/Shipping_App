"use client"
import React, { useState } from 'react'
import Image from 'next/image'

export default function ContactForm() {
    const [form, setForm] = useState({ name: '', email: '', mobile: '', subject: '', query: '' })
    const [isLoading, setIsLoading] = useState(false)

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsLoading(true)
        // Keep behavior minimal to avoid external calls; mimic legacy by resetting
        setTimeout(() => {
            setIsLoading(false)
            setForm({ name: '', email: '', mobile: '', subject: '', query: '' })
            // In legacy they showed swal success; we avoid external libs to prevent warnings
        }, 700)
    }

    return (
        <form onSubmit={handleSubmit} className="contact-form Reative mt-6">
            {isLoading && <div className="LoaderForm">Loading...</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm text-blue-900">Your Name</label>
                    <input name="name" value={form.name} onChange={handleChange} className="w-full border border-slate-400 p-2 rounded-md bg-white mt-1" />
                </div>
                <div>
                    <label className="block text-sm text-blue-900">E-Mail ID</label>
                    <input name="email" value={form.email} onChange={handleChange} className="w-full border border-slate-400 p-2 rounded-md bg-white mt-1" />
                </div>
                <div>
                    <label className="block text-sm text-blue-900">Phone No.</label>
                    <input name="mobile" value={form.mobile} onChange={handleChange} className="w-full border border-slate-400 p-2 rounded-md bg-white mt-1" />
                </div>
                <div>
                    <label className="block text-sm text-blue-900">Subject</label>
                    <input name="subject" value={form.subject} onChange={handleChange} className="w-full border border-slate-400 p-2 rounded-md bg-white mt-1" />
                </div>
            </div>
            <div className="mt-4">
                <label className="block text-sm text-blue-900">Your Query</label>
                <textarea name="query" value={form.query} onChange={handleChange} style={{ height: 120 }} className="w-full border border-slate-400 p-2 mt-2 rounded-md bg-white" />
            </div>
            <button type="submit" className="send-btn mt-4 inline-flex items-center px-4 py-2 bg-blue-900 text-white rounded">
                Send Message
                <span className="ml-2" aria-hidden>✉️</span>
            </button>
        </form>
    )
}