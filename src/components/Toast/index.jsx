import { createContext, useContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ToastContainer, ToastItem, ToastIcon, ToastMessage } from './Toast.styles';

// Icons as inline SVG
const icons = {
	success: (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
			<path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	),
	error: (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
			<circle cx="12" cy="12" r="10" />
			<path d="M15 9l-6 6M9 9l6 6" strokeLinecap="round" />
		</svg>
	),
	warning: (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
			<path d="M12 9v4M12 17h.01" strokeLinecap="round" />
			<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
		</svg>
	),
	info: (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
			<circle cx="12" cy="12" r="10" />
			<path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
		</svg>
	),
};

// Toast Context
const ToastContext = createContext(null);

export function useToast() {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error('useToast must be used within a ToastProvider');
	}
	return context;
}

// Individual Toast Component
function Toast({ id, message, variant = 'info', onRemove }) {
	const [exiting, setExiting] = useState(false);

	const handleRemove = useCallback(() => {
		setExiting(true);
		setTimeout(() => onRemove(id), 200);
	}, [id, onRemove]);

	// Auto-dismiss after 4 seconds
	useState(() => {
		const timer = setTimeout(handleRemove, 4000);
		return () => clearTimeout(timer);
	});

	return (
		<ToastItem $variant={variant} $exiting={exiting} onClick={handleRemove}>
			<ToastIcon $variant={variant}>{icons[variant]}</ToastIcon>
			<ToastMessage>{message}</ToastMessage>
		</ToastItem>
	);
}

// Toast Provider Component
export function ToastProvider({ children }) {
	const [toasts, setToasts] = useState([]);

	const addToast = useCallback((message, variant = 'info') => {
		const id = Date.now() + Math.random();
		setToasts((prev) => [...prev, { id, message, variant }]);
		
		// Auto-remove after 4.5 seconds (4s visible + 0.5s buffer)
		setTimeout(() => {
			setToasts((prev) => prev.filter((t) => t.id !== id));
		}, 4500);
		
		return id;
	}, []);

	const removeToast = useCallback((id) => {
		setToasts((prev) => prev.filter((t) => t.id !== id));
	}, []);

	const toast = {
		success: (message) => addToast(message, 'success'),
		error: (message) => addToast(message, 'error'),
		warning: (message) => addToast(message, 'warning'),
		info: (message) => addToast(message, 'info'),
	};

	return (
		<ToastContext.Provider value={toast}>
			{children}
			{createPortal(
				<ToastContainer>
					{toasts.map((t) => (
						<Toast
							key={t.id}
							id={t.id}
							message={t.message}
							variant={t.variant}
							onRemove={removeToast}
						/>
					))}
				</ToastContainer>,
				document.body
			)}
		</ToastContext.Provider>
	);
}
