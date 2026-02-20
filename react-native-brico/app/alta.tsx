import React, { useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import api from '../src/services/api';

export default function AltaTeacher() {
  // Estado para el formulario basado en tu JSON de la API
  const [form, setForm] = useState({
    dni: "",
    fullname: "",
    email: "",
    hire_date: "",
    image_url: "",
  });

  const [loading, setLoading] = useState(false);

  // Helper para mostrar alert con fallback en web
  const showAlert = (title: string, message?: string) => {
    if (Platform.OS === 'web') {
      // window.alert funciona en la web (Expo web)
      window.alert(title + (message ? '\n\n' + message : ''));
    } else {
      Alert.alert(title, message);
    }
  };

  // Función para enviar los datos
  const handleSave = async () => {
    console.log('[AltaTeacher] handleSave called — form:', form);
    // Validación simple
    if (!form.dni || !form.fullname || !form.email || !form.hire_date) {
      showAlert("Error", "Rellena DNI, nombre, email y fecha de alta.");
      return;
    }

    setLoading(true);
    try {
      // Usamos el endpoint para el alta
      await api.post('/teachers', form);
      
      showAlert('Éxito', 'Profesor/a guardado correctamente');
      
      // Limpiar formulario tras éxito
      setForm({ dni: "", fullname: "", email: "", hire_date: "", image_url: "" });
    } catch (error: any) {
      // El interceptor que creamos antes manejará el log,
      // aquí mostramos el error en consola y al usuario.
      console.error('[AltaTeacher] save error:', error);
      showAlert('Error', error?.mensaje || 'No se pudo guardar el profesor/a');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>Nuevo Profesor/a</Text>
      
      <TextInput
        label="DNI"
        value={form.dni}
        onChangeText={(text) => setForm({ ...form, dni: text })}
        mode="outlined"
        style={styles.input}
        placeholder="Ej: 12345678A"
        autoCapitalize="characters"
      />

      <TextInput
        label="Nombre completo"
        value={form.fullname}
        onChangeText={(text) => setForm({ ...form, fullname: text })}
        mode="outlined"
        style={styles.input}
        placeholder="Ej: Gabriela Pérez"
      />

      <TextInput
        label="Email"
        value={form.email}
        onChangeText={(text) => setForm({ ...form, email: text })}
        mode="outlined"
        style={styles.input}
        placeholder="Ej: profe@centro.es"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        label="Fecha de alta (YYYY-MM-DD)"
        value={form.hire_date}
        onChangeText={(text) => setForm({ ...form, hire_date: text })}
        mode="outlined"
        style={styles.input}
        placeholder="Ej: 2026-02-19"
      />

      <TextInput
        label="URL de imagen (opcional)"
        value={form.image_url}
        onChangeText={(text) => setForm({ ...form, image_url: text })}
        mode="outlined"
        style={styles.input}
        placeholder="https://..."
      />

<Button 
        mode="contained" 
        onPress={handleSave} 
        loading={loading}
        disabled={loading}
        icon="content-save"
        style={styles.button}
      >
        Guardar Profesor/a
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 20,
    color: '#6200ee',
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
  },
});