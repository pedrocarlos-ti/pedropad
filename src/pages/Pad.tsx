import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Box, Card, Container, Group, Image, Text, Textarea, Title } from '@mantine/core';
import Logo from '../assets/logo.svg';
import classes from './Pad.module.css';

const socket = io('http://localhost:3000'); // Adjust the URL as needed

const Pad = () => {
  const [content, setContent] = useState(''); // New state for content

  useEffect(() => {
    socket.on('receive_content', (newContent) => {
      setContent(newContent); // Update content when received
    });

    return () => {
      socket.off('receive_content'); // Clean up on unmount
    };
  }, []);

  const handleChange = (value: string) => {
    setContent(value); // Update local state
    socket.emit('send_content', value); // Emit content to others
  };

  return (
    <Box bg="brand.0">
      <Container size="xl" h="100vh" p="xl">
        <Card radius="xs">
          <Header />
          <Textarea
            minRows={4}
            classNames={{ input: classes.input }}
            value={content} // Bind value to state
            onChange={(event) => handleChange(event.currentTarget.value)} // Handle change
          />
          <Footer />
        </Card>
      </Container>
    </Box>
  );
};

const Header = () => {
  return (
    <Box className={classes.header}>
      <Group py="sm" px="xl" align="center" justify="flex-start">
        <Image src={Logo} alt="Logo" w="2.2rem" />
        <Text c="brand.9" fw={500} size="md" ff="monospace">
          pedropad
        </Text>
      </Group>
    </Box>
  );
};

const Footer = () => {
  return (
    <Box className={classes.footer}>
      <Group p="md" align="center" justify="center">
        <Title c="brand.5" order={6}>
          <Text fw={700} size="md" span c="dark">
            pedropad
          </Text>
          - A free and open-source collaborative text editor - v0.0.1
        </Title>
      </Group>
    </Box>
  );
};

export default Pad;
