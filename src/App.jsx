import { ThemeProvider } from 'styled-components';
import { Main } from './containers/Main';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import theme from './theme';
import { ToastProvider } from './components/Toast';
import { PrivacyProvider } from './context/PrivacyContext';

function App() {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<div className="App">
				<ThemeProvider theme={theme}>
					<PrivacyProvider>
						<ToastProvider>
							<Main />
						</ToastProvider>
					</PrivacyProvider>
				</ThemeProvider>
			</div>
		</QueryClientProvider>
	);
}

export default App;
