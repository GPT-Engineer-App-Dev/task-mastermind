import { useState } from 'react';
import {
  Container,
  VStack,
  Heading,
  Input,
  Button,
  UnorderedList,
  ListItem,
  Select,
  Tag,
  TagLabel,
  TagCloseButton,
  HStack,
  useToast,
  Text
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [category, setCategory] = useState('General');
  const [priority, setPriority] = useState('Medium');
  const toast = useToast();

  const addTask = () => {
    if (inputValue.trim() === '') {
      toast({
        title: 'Cannot add empty task.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newTask = {
      id: Date.now(),
      text: inputValue,
      category,
      priority,
    };
    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  return (
    <VStack spacing={4} width="100%" minHeight="100vh" justifyContent="space-between">
      <Container centerContent maxW="container.md" py={8}>
        <VStack spacing={4} width="100%">
          <Heading mb={6}>To-Do App</Heading>
          <VStack spacing={4} align="stretch">
            <Input
              placeholder="Add a new task"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <HStack>
              <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="General">General</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
              </Select>
              <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </Select>
              <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={addTask}>
                Add Task
              </Button>
            </HStack>
          </VStack>
          <UnorderedList spacing={3} mt={6} width="100%">
            {tasks.map(task => (
              <ListItem key={task.id} p={2} borderWidth="1px" borderRadius="lg" display="flex" justifyContent="space-between" alignItems="center">
                <span>{task.text}</span>
                <HStack>
                  <Tag colorScheme={task.priority === 'High' ? 'red' : task.priority === 'Medium' ? 'orange' : 'green'}>
                    <TagLabel>{task.priority}</TagLabel>
                  </Tag>
                  <Tag colorScheme="blue">
                    <TagLabel>{task.category}</TagLabel>
                  </Tag>
                  <Tag colorScheme="gray" cursor="pointer" onClick={() => deleteTask(task.id)}>
                    <TagCloseButton />
                  </Tag>
                </HStack>
              </ListItem>
            ))}
          </UnorderedList>
        </VStack>
      </Container>
      <VStack as="footer" spacing={4} width="100%" pt={8}>
        <Container centerContent>
          <Text fontSize="sm">© 2023 To-Do App, Inc. All rights reserved.</Text>
        </Container>
      </VStack>
    </VStack>
  );
};

export default Index;