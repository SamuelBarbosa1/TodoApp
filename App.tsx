import { StatusBar } from 'react-native'
import {
	useFonts,
	Inter_400Regular,
	Inter_700Bold,
} from '@expo-google-fonts/inter'
import { HomeScreen } from './src/screens'
import { Loading } from './src/components/Loading'

export default function App() {
	const [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_700Bold,
	})

	return (
		<>
			{fontsLoaded ? <HomeScreen /> : <Loading />}
			<StatusBar
				barStyle="light-content"
				backgroundColor="transparent"
				translucent
			/>
		</>
	)
}

/* Querido programador:
Quando eu escrevi este código,
apenas Deus e eu sabíamos como ele funcionava.
Agora, apenas Deus sabe!

portanto, se você estiver tentando melhorar esta rotina porque
está falhando e "com certeza está", por favor, aumente este contator
como um aviso para a próxima pessoa

total_horas_gastar_aqui: 420
*/