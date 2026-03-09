"use client";

import Modal from '@/components/ui/Modal';
import { useRouter } from 'next/navigation';

type Props = {
    open: boolean;
    onClose: () => void;
};

export default function GetStartedModal({ open, onClose }: Props) {
    const router = useRouter();

    const go = (role: 'sender' | 'traveler') => {
        onClose();
        if (role === 'sender') router.push('/sender');
        else router.push('/traveler');
    };

    return (
        <Modal open={open} onClose={onClose} title="Get started" size="sm">
            <div className="space-y-4">
                <p className="text-sm text-slate-700">Are you a sender or a traveler? Choose one to continue.</p>
                <div className="flex gap-3">
                    <button onClick={() => go('sender')} className="flex-1 px-4 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer">I'm a sender</button>
                    <button onClick={() => go('traveler')} className="flex-1 px-4 py-3 rounded-md bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 transition cursor-pointer">I'm a traveler</button>
                </div>
            </div>
        </Modal>
    );
}
