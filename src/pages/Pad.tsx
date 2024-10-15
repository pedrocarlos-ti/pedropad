import { Box, Card, Container, Group, Image, Text, Textarea, Title } from '@mantine/core';
import Logo from '../assets/logo.svg';
import classes from './Pad.module.css';

const Pad = () => {
  return (
    <Box bg="brand.0">
      <Container size="xl" h="100vh" p="xl">
        <Card radius="xs">
          <Header />
          <Textarea minRows={4} classNames={{ input: classes.input }} />
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
