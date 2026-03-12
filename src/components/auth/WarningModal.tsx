"use client";

import Modal from '@/components/ui/Modal';

type Props = {
    open: boolean;
    onClose: () => void;
};

export default function WarningModal({ open, onClose }: Props) {
    return (
        <Modal open={open} onClose={onClose} title="Important — Please read" size="sm">
            <div className="space-y-4">
                <p className="text-sm text-slate-700">
                    Social Shipping is a matchmaking platform connecting senders and travelers. Once you are connected, the platform does not take responsibility for the parcel or the transaction between the sender and the traveler.
                </p>
                <p className="text-sm text-slate-700">
                    By continuing you acknowledge that the platform acts only as an intermediary and is not responsible for what happens after contact is established between the two parties.
                </p>

                <div className="pt-2 flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium cursor-pointer">
                        I understand
                    </button>
                </div>
            </div>
        </Modal>
    );
}
