import React from 'react';
import { Dialog, Portal } from 'react-native-paper';
import { FlatList, View, Text } from 'react-native';
import Button from '../Atoms/Button';
import LabelTextInput from '../Atoms/LabelTextInput';

interface CategoriesListProps {
    visible: boolean;
    categories: string[];
    newCategory: string | null;
    hideCategoryDialog: () => void;
    setNewCategory: (category: string | null) => void;
    addCategory: () => void;
    deleteCategory: (category: string) => void;
}

const CategoriesList: React.FC<CategoriesListProps> = ({
    visible,
    categories,
    newCategory,
    hideCategoryDialog,
    setNewCategory,
    addCategory,
    deleteCategory,
}) => {
    const renderCategory = (category: string) => {
        return (
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        backgroundColor: '#E1AFD1',
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        margin: 1,
                        justifyContent: 'space-between',
                        borderRadius: 8,
                    }}
                >
                    <Text style={{
                        alignSelf: 'center',
                        color: '#FFE6E6'
                    }}>
                        {category}
                    </Text>
                    <Button
                        title="Delete"
                        onPress={() => deleteCategory(category)}
                        textStyles={{
                            color: '#5FBDFF',
                        }}
                        buttonStyles={{
                            backgroundColor: 'red',
                            borderRadius: 8,
                            paddingVertical: 8,
                            paddingHorizontal: 12,
                            marginHorizontal: 5,
                        }}
                    />
                </View>
            </View>
        );
    };

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={hideCategoryDialog} style={{ backgroundColor: '#AD88C6' }}>
                <Dialog.Title style={{ color: '#FFE6E6' }}>Categories List</Dialog.Title>
                <Dialog.Content>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <LabelTextInput
                            label='Add New Category'
                            value={newCategory || ''}
                            onChangeText={inputCategory => setNewCategory(inputCategory)}
                            containerStyle={{ flex: 0.7 }}
                        />
                        <Button
                            title="Add"
                            onPress={() => addCategory()}
                            textStyles={{
                                color: '#FFE6E6',
                                alignSelf: 'center',
                            }}
                            buttonStyles={{
                                backgroundColor: '#E1AFD1',
                                borderRadius: 8,
                                paddingVertical: 8,
                                paddingHorizontal: 12,
                                marginHorizontal: 5,
                                flex: 0.2,
                                height: 50,
                                justifyContent: 'center',
                                alignSelf: 'center',
                            }}
                        />
                    </View>
                    <FlatList
                        data={categories}
                        renderItem={({ item }) => renderCategory(item)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button
                        onPress={hideCategoryDialog}
                        title='Done'
                        textStyles={{
                            color: '#FFE6E6',
                            textAlign: 'center',
                        }}
                        buttonStyles={{
                            backgroundColor: '#7469B6',
                            borderRadius: 8,
                            paddingVertical: 8,
                            paddingHorizontal: 12,
                            marginHorizontal: 5,
                            flex: 1,
                        }}
                    />
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}

export default CategoriesList;