import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text, Avatar, IconButton, Button } from "react-native-paper";

interface TeacherProps {
	id_teacher: number;
	fullname: string;
	dni: string;
	email: string;
	hire_date: string;
	image_url?: string | null;
	onDelete: (id: number) => void;
}

export function TeacherCard({
	id_teacher,
	fullname,
	dni,
	email,
	hire_date,
	image_url,
	onDelete,
}: TeacherProps) {
	return (
		<Card style={styles.card} mode='elevated'>
			{/* Cabecera con Avatar e Icono de Borrado */}
			<Card.Title
				title={fullname}
				titleVariant='titleLarge'
				subtitle={`DNI: ${dni}`}
				left={(props) =>
					image_url ? (
						<Avatar.Image {...props} source={{ uri: image_url }} />
					) : (
						<Avatar.Text
							{...props}
							label={(fullname || "?").slice(0, 2).toUpperCase()}
						/>
					)
				}
				right={(props) => (
					<IconButton
						{...props}
						icon='delete-outline'
						iconColor='#B00020'
						onPress={() => onDelete(id_teacher)}
					/>
				)}
			/>

			<Card.Content style={styles.content}>
				<Text variant='bodyMedium' style={styles.bio}>
					{email}
				</Text>
				<Text
					variant='bodySmall'
					style={{ marginTop: 6, color: "#666" }}>
					Alta: {hire_date}
				</Text>
			</Card.Content>

			{/* Acciones adicionales (Opcional: Ver detalle o Editar) */}
			<Card.Actions>
				<Button
					mode='text'
					onPress={() =>
						console.log("Detalle no hace nada", id_teacher)
					}>
					Detalle
				</Button>
			</Card.Actions>
		</Card>
	);
}

const styles = StyleSheet.create({
	card: {
		marginBottom: 16,
		borderRadius: 12,
		backgroundColor: "#fff",
	},
	content: {
		marginTop: 8,
	},
	bio: {
		color: "#444",
		lineHeight: 20,
	},
});
