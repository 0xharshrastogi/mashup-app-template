import { QdtProvider } from './components/containers';
import { Home } from './pages/Home/Home';
import { LocalStorageQdtListHandler } from './services';

export const App = () => {
	console.log('Please refer to site for demo qvf app https://sense-demo.qlik.com/');
	return (
		<QdtProvider qdt={new LocalStorageQdtListHandler()}>
			<Home />
		</QdtProvider>
	);
};
