import { createContext, useContext, useState, useEffect } from 'react';

const PrivacyContext = createContext();

const STORAGE_KEY = 'fintrack_values_hidden';

export function PrivacyProvider({ children }) {
	const [valuesHidden, setValuesHidden] = useState(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored === 'true';
	});
	
	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, valuesHidden.toString());
	}, [valuesHidden]);
	
	const toggleHidden = () => setValuesHidden(prev => !prev);
	
	return (
		<PrivacyContext.Provider value={{ valuesHidden, toggleHidden }}>
			{children}
		</PrivacyContext.Provider>
	);
}

export function usePrivacy() {
	const context = useContext(PrivacyContext);
	if (!context) {
		throw new Error('usePrivacy must be used within a PrivacyProvider');
	}
	return context;
}
