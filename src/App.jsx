import { ThemeProvider } from 'styled-components';
import { Main } from './containers/Main';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import theme from './theme';
import { ToastProvider } from './components/Toast';

function App() {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<div className="App">
				<ThemeProvider theme={theme}>
					<ToastProvider>
						<Main />
					</ToastProvider>
				</ThemeProvider>
			</div>
		</QueryClientProvider>
	);
}

export default App;
