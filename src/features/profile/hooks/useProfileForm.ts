import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { getApiErrorMessage } from '../../../shared/utils/getApiErrorMessage';
import { useAuthStore } from '../../auth/store/auth.store';
import { updateProfile, updateProfileImage } from '../api/profile.api';
import {
    updateProfileSchema,
    type UpdateProfileFormValues,
} from '../schema/updateProfile.schema';

export const useProfileForm = () => {
    const user = useAuthStore((state) => state.user);
    const setUser = useAuthStore((state) => state.setUser);
    const [isEditing, setIsEditing] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    const form = useForm<UpdateProfileFormValues>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: { name: user?.name ?? '', email: user?.email ?? '' },
    });

    const startEditing = () => {
        form.reset({ name: user?.name ?? '', email: user?.email ?? '' });
        setIsEditing(true);
    };

    const cancelEditing = () => {
        form.reset();
        setIsEditing(false);
    };

    const onSubmit = async (values: UpdateProfileFormValues) => {
        try {
            const updated = await updateProfile(values);
            setUser(updated);
            setIsEditing(false);
            toast.success('Datos actualizados correctamente.');
        } catch (error) {
            toast.error(getApiErrorMessage(error, 'No se pudieron actualizar los datos.'));
        }
    };

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !user) return;

        setUploadingImage(true);
        try {
            const image = await updateProfileImage(file);
            setUser({ ...user, image });
            toast.success('Imagen de perfil actualizada.');
        } catch (error) {
            toast.error(getApiErrorMessage(error, 'No se pudo actualizar la imagen.'));
        } finally {
            setUploadingImage(false);
            event.target.value = '';
        }
    };

    return {
        ...form,
        isEditing,
        uploadingImage,
        startEditing,
        cancelEditing,
        onSubmit,
        handleImageChange,
    };
};
