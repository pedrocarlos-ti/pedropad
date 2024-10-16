import { Box, Card, Container, Group, Image, Text, Textarea, Title } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import classes from './Pad.module.css';

const socket = io(import.meta.env.VITE_BACKEND_URL);

const Pad = () => {
  const [content, setContent] = useState(''); // New state for content
  const [isConnected, setIsConnected] = useState(false);

  const handleReceiveContent = useCallback((newContent: string) => {
    setContent(newContent);
  }, []);

  useEffect(() => {
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    socket.on('initial_content', handleReceiveContent);
    socket.on('receive_content', handleReceiveContent);

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('initial_content');
      socket.off('receive_content');
    };
  }, [handleReceiveContent]);

  const handleChange = (value: string) => {
    setContent(value); // Update local state
    socket.emit('send_content', value); // Emit content to others
  };

  return (
    <Box bg="brand.0">
      <Container size="xl" h="100vh" p={{ base: '0', md: 'xl' }}>
        <Card radius="xs">
          <Header />
          <Textarea
            minRows={4}
            classNames={{ input: classes.input }}
            value={content} // Bind value to state
            onChange={(event) => handleChange(event.currentTarget.value)} // Handle change
            disabled={!isConnected}
          />
          <Footer isConnected={isConnected} />
        </Card>
      </Container>
    </Box>
  );
};

const Header = () => {
  return (
    <Box className={classes.header}>
      <Group py="sm" px="xl" align="center" justify="flex-start">
        <Image src="https://www.svgrepo.com/show/304506/edit-pen.svg" alt="Logo" w="2.2rem" />
        <Text c="brand.9" fw={500} size="md" ff="monospace">
          pedropad
        </Text>
      </Group>
    </Box>
  );
};

const Footer = ({ isConnected }: { isConnected: boolean }) => {
  return (
    <Box className={classes.footer}>
      <Group gap="xs" p="md" align="center" justify="center">
        <Text fw={700} size="md" span c="dark">
          pedropad
        </Text>
        <Title c="brand.5" order={6}>
          A free and open-source collaborative text editor
        </Title>
        <Text c={isConnected ? 'green' : 'red'}>{isConnected ? 'Connected' : 'Disconnected'}</Text>
      </Group>
    </Box>
  );
};

export default Pad;
