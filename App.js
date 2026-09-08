// App.js

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { store } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';

/**
 * PONTO DE ENTRADA DO APLICATIVO.
 *
 * A ordem dos "envelopes" aqui não é decorativa:
 *
 * 1. Provider          -> injeta a store. Precisa ser o mais externo, porque
 *                         o AppNavigator usa useSelector para decidir o fluxo.
 *                         Se o Provider ficasse por dentro, o useSelector quebraria.
 * 2. SafeAreaProvider  -> mede as áreas seguras (notch, barra de gestos) e
 *                         disponibiliza para qualquer tela que use SafeAreaView.
 * 3. StatusBar         -> aparência da barra de status do sistema.
 * 4. AppNavigator      -> a partir daqui, quem manda é a navegação.
 *
 * Repare que App.js não tem NENHUMA regra de negócio. É só composição.
 */
export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}
