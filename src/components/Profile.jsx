import React, { useState, useEffect } from 'react';
import { View, Button, FlatList, Modal, TextInput, Text } from 'react-native';
import { getPosts, toPost, UpdateUser, DeleteUser } from '../../api/api';
import styles from './Style';

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [editingPost, setEditingPost] = useState({ id: null, title: '', body: '' });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const data = await getPosts();
    setPosts(data);
  };

  const handleAddPost = async () => {
    if (!newPost.title || !newPost.body) return;
    const addedPost = await toPost(newPost);
    setPosts((prevPosts) => {
      const nextId = prevPosts.length > 0 ? prevPosts[prevPosts.length - 1].id + 1 : 1;
      return [...prevPosts, { ...addedPost, id: nextId }];
    });
    setNewPost({ title: '', body: '' });
    setModalVisible(false);
  };

  const handleUpdatePost = async () => {
    if (!editingPost.title || !editingPost.body) return;
    const updatedPost = await UpdateUser(editingPost.id, {
      title: editingPost.title,
      body: editingPost.body,
    });
    setPosts(posts.map(post => (post.id === editingPost.id ? updatedPost : post)));
    setEditModalVisible(false);
  };

  const handleDeletePost = async (id) => {
    await DeleteUser(id);
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <View style={styles.container}>
      <Button title="Add Post" onPress={() => setModalVisible(true)} color="#007bff" />

      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Title: {item.title}</Text>
            <Text style={styles.itemText}>Body: {item.body}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Update" onPress={() => {
                setEditingPost(item);
                setEditModalVisible(true);
              }} color="orange" />
              <Button title="Delete" onPress={() => handleDeletePost(item.id)} color="red" />
            </View>
          </View>
        )}
      />

      {/* Add Post Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Enter Title"
              value={newPost.title}
              onChangeText={text => setNewPost({ ...newPost, title: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Body"
              value={newPost.body}
              onChangeText={text => setNewPost({ ...newPost, body: text })}
            />
            <View style={styles.modalButtonContainer}>
              <View style={styles.modalButton}>
                <Button title="Cancel" onPress={() => setModalVisible(false)} color="gray" />
              </View>
              <View style={styles.modalButton}>
                <Button title="Add" onPress={handleAddPost} color="green" />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Post Modal */}
      <Modal visible={editModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Edit Title"
              value={editingPost.title}
              onChangeText={text => setEditingPost({ ...editingPost, title: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Edit Body"
              value={editingPost.body}
              onChangeText={text => setEditingPost({ ...editingPost, body: text })}
            />
            <View style={styles.modalButtonContainer}>
              <View style={styles.modalButton}>
                <Button title="Cancel" onPress={() => setEditModalVisible(false)} color="gray" />
              </View>
              <View style={styles.modalButton}>
                <Button title="Update" onPress={handleUpdatePost} color="green" />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Profile;
