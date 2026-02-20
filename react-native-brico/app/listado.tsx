import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, FlatList, Platform, StyleSheet, View } from "react-native";
import { ActivityIndicator, FAB, Text } from "react-native-paper";
import { TeacherCard } from "../src/components/TeacherCard";
import api from "../src/services/api";

export default function Listado() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper para mostrar mensajes (Multiplataforma)
  const showSimpleAlert = (title, message) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  // GET /teachers
  const fetchTeachers = async () => {
    try {
      setLoading(true);

      const data = await api.get("/teachers");
      // Si tu interceptor devuelve {ok, datos, mensaje}:
      const list = Array.isArray(data?.datos) ? data.datos : Array.isArray(data) ? data : [];

      setTeachers(list);
    } catch (error) {
      showSimpleAlert("Error", error?.mensaje || "No se pudieron cargar los datos");
    } finally {
      setLoading(false);
    }
  };

  // refrescar al entrar en la pantalla
  useFocusEffect(
    useCallback(() => {
      fetchTeachers();
    }, [])
  );

  // Confirmación borrado
  const handleDelete = (id) => {
    const title = "Eliminar";
    const msg = "¿Estás segura de que quieres eliminar este profesor/a?";

    if (Platform.OS === "web") {
      if (window.confirm(`${title}\n\n${msg}`)) {
        ejecutarBorrado(id);
      }
    } else {
      Alert.alert(title, msg, [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", onPress: () => ejecutarBorrado(id), style: "destructive" },
      ]);
    }
  };

  // DELETE /teachers/:id  ✅ (sin typo)
  const ejecutarBorrado = async (id) => {
    try {
      await api.delete(`/teachers/${id}`);
      showSimpleAlert("Éxito", "Profesor/a eliminado");
      fetchTeachers();
    } catch (error) {
      showSimpleAlert("Error", error?.mensaje || "No se pudo eliminar el registro");
    }
  };

  // Cargando inicial
  if (loading && teachers.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator animating={true} size="large" />
        <Text style={{ marginTop: 10 }}>Cargando profesores...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={teachers}
        keyExtractor={(item, index) => String(item?.id_teacher ?? item?.id_profesor ?? index)}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TeacherCard
            id_teacher={item.id_teacher ?? item.id_profesor}
            fullname={item.fullname}
            dni={item.dni}
            email={item.email}
            hire_date={item.hire_date}
            image_url={item.image_url}
            onDelete={() => handleDelete(item.id_teacher ?? item.id_profesor)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text variant="bodyLarge">No hay profesores disponibles</Text>
          </View>
        }
      />

      <FAB icon="refresh" style={styles.fab} onPress={fetchTeachers} color="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  listContent: { padding: 16, paddingBottom: 100 },
  fab: { position: "absolute", margin: 16, right: 0, bottom: 0, backgroundColor: "#57754a" },
});
