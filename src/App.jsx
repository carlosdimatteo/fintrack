import { ThemeProvider } from 'styled-components';
import { Main } from './containers/Main';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import theme from './theme';

function App() {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<div className="App">
				<ThemeProvider theme={theme}>
					<Main />
				</ThemeProvider>
			</div>
		</QueryClientProvider>
	);
}

export default App;
