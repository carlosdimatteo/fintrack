import { ThemeProvider } from 'styled-components';
import { Main } from './containers/Main';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
function App() {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<div className="App">
				<ThemeProvider
					theme={{
						colors: { primary: 'black' },
						gradient: {
							main: {
								background:
									'linear-gradient(120deg, rgba(48,44,55,1) 0%, rgba(33,46,51,1) 100%)',
							},
						},
					}}
				>
					<Main />
				</ThemeProvider>
			</div>
		</QueryClientProvider>
	);
}

export default App;
