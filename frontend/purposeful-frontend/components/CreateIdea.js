import { Fragment, useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  HStack,
  Checkbox,
  Textarea,
  Button,
  useColorModeValue,
  FormErrorMessage,
  Select,
  Text,
  IconButton,
  Tooltip,
  Icon,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { getDomains, getTechs, getTopics } from "@/utils/idea_tool";
import ContainerLabel from "./ContainerLabel";
import { RxPlus } from "react-icons/rx";
import { BsInfoCircle } from "react-icons/bs";

var domains = [];
var topics = [];
var techs = [];


var fullfilled = 0;
var field_name = "domains";
var c_domains = [];
var c_topics = [];
var c_techs = [];

var domains_sel = <Select id="domains"></Select>;
var topics_sel = <Select id="topics"></Select>;
var techs_sel = <Select id="techs"></Select>;
var domains_sel = <Select id="domains"></Select>;
var topics_sel = <Select id="topics"></Select>;
var techs_sel = <Select id="techs"></Select>;

var rendered_domains = [];
var rendered_topics = [];
var rendered_techs = [];

export default function CreateIdea() {
  const [render_domains, set_rd] = useState(<Fragment></Fragment>);
  const [render_topics, set_tp] = useState(<Fragment></Fragment>);
  const [render_techs, set_tc] = useState(<Fragment></Fragment>);

  function validateRequired(req, entered){
    return (req === '' && entered == true);
  }

  var domainContainer = (
    <Stack
      on
      direction={["column", "row"]}
      id={"domainContainer"}
      wrap={"wrap"}
    >
      {render_domains}
    </Stack>
  );
  var topicContainer = (
    <Stack on direction={["column", "row"]} id={"topicContainer"} wrap={"wrap"}>
      {render_topics}
    </Stack>
  );
  var techContainer = (
    <Stack on direction={["column", "row"]} id={"techContainer"} wrap={"wrap"}>
      {render_techs}
    </Stack>
  );

  //Form Data
  const [title,setTitle] = useState('');
  const [purpose,setPurpose] = useState('');
  const [description,setDescription] = useState('');
  const [iconURL,setIconURL] = useState('');
  const [domns,setDomns] = useState([]);
  const [topcs,setTopcs] = useState([]);
  const [tchs,setTchs] = useState([]);

  //Used to restrict isInvalid to until after a value is entered
  const [enteredTitle,setEnteredTitle] = useState(false);
  const [enteredPurpose,setEnteredPurpose] = useState(false);
  const [enteredDescription, setEnteredDescription] = useState(false);
  const [enteredIconURL,setEnteredIconURL] = useState(false);
  const [enteredDomains, setEnteredDomains] = useState(false);
  const [enteredTopics, setEnteredTopics] = useState(false);
  const [enteredTechs, setEnteredTechs] = useState(false);

  function handleRequired(fn,value,enteredFn){
    enteredFn(true);
    fn(value);
  }

  function handleArrays(arg1,arg2,arg3,arg4,enteredFn){
    enteredFn(true);
    PushObj(arg1,arg2,arg3,arg4);
  }

  function validateArrays(obj_arr, entered){
    return (obj_arr.length == 0 && entered);
  }

  useEffect(() => {
    getDomains().then((res) => {
      if (fullfilled == 0) {
        fullfilled++;
        domains = res;
        domains.map(MakeOption);
      }
    });
    getTopics().then((res) => {
      if (fullfilled == 1) {
        fullfilled++;
        topics = res;
        field_name = "topics";
        topics.map(MakeOption);
      }
    });
    getTechs().then((res) => {
      if (fullfilled == 2) {
        fullfilled++;
        techs = res;
        field_name = "techs";
        techs.map(MakeOption);
      }
    });
  }, []);

  var refreshfn = function () {
    set_rd(<Fragment>{rendered_domains.concat([])}</Fragment>);
    set_tp(<Fragment>{rendered_topics.concat([])}</Fragment>);
    set_tc(<Fragment>{rendered_techs.concat([])}</Fragment>);
    setDomns(c_domains.concat([]));
    setTopcs(c_topics.concat([]));
    setTchs(c_techs.concat([]));
  };
  function MakeOption(X) {
    const el = document.createElement("option");
    el.setAttribute("value", X.id);
    el.textContent = X.name;
    document.getElementById(field_name).appendChild(el);
  }

  function PushObj(selectedIndex, arr, c_arr, arr2) {
    if (find_in_arr(selectedIndex, arr, c_arr) == -1) {
      const el = (
        <ContainerLabel
          key={arr[selectedIndex].name}
          innerTxt={arr[selectedIndex].name}
          arr={c_arr}
          arr2={arr2}
          refresh={refreshfn}
        />
      );
      c_arr.push(arr[selectedIndex]);
      arr2.push(el);
      refreshfn();
    }
  }
  return (
    <Stack width={"75%"}>
      <Box
        //width={"1"}
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <Text fontSize={"2em"} textShadow={"2px 2px "+useColorModeValue("rgba(0,0,0,0.1)","rgba(255,255,255,0.1)")}>Create An Idea. Pursue it with Purpose.</Text>
        <Formik
          initialValues={{}}
          onSubmit={(values, actions) => {
            setTimeout(async () => {
              console.log(values); // TODO: To be removed once the API is connected
              // TODO: Set the error messages for the fields according to the API response
              // TODO: Differentiate API methods depending on authentication status
              actions.setSubmitting(false);
              // TODO: Redirect to the login page
            }, 1000);
          }}
        >
          {(props) => (
            <Form>
              <HStack spacing={2}>
                <Stack spacing={4} width={"50%"}>
                  <Text fontSize={"xl"} fontWeight={"bold"}>Idea Details</Text>
                  <Box>
                    <Field name="title">
                      {({ field, form }) => (
                        <FormControl isRequired={"true"} isInvalid={validateRequired(title,enteredTitle)}>
                          <FormLabel>Title</FormLabel>
                          <HStack> 
                          <Input placeholder="Title" {...field} value={title} type="text" onChange={(e) => handleRequired(setTitle,e.target.value,setEnteredTitle)}/>
                          <Tooltip label="Share the title of your idea here! Titles should aim to be short and catchy, giving your idea a bang!">
                            <Box height={"fit-content"}><BsInfoCircle/></Box>
                          </Tooltip>
                          </HStack>
                          <FormErrorMessage>Title is Required.</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box>
                    <Field name="purpose">
                      {({ field, form }) => (
                        <FormControl id="purpose" isRequired={"true"} isInvalid={validateRequired(purpose,enteredPurpose)}>
                          <FormLabel>Purpose</FormLabel>
                          <HStack>
                          <Input placeholder="Purpose" {...field} value={purpose} type="text" onChange={(e) => handleRequired(setPurpose,e.target.value,setEnteredPurpose)}/>
                          <Tooltip label="Share the purpose of your idea! What is driving you to pursue it? For example, what need in your reality does it attempt to address? What skills are you hoping to develop?">
                          <Box height={"fit-content"}><BsInfoCircle/></Box>
                          </Tooltip>
                          </HStack>
                          <FormErrorMessage>Purpose is Required.</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box>
                    <Field name="description">
                      {({ field, form }) => (
                        <FormControl id="description" isRequired={"true"} isInvalid={validateRequired(description,enteredDescription)}>
                          <FormLabel>Description</FormLabel>
                          <HStack alignItems={"top"}>
                          <Textarea
                            placeholder="Briefly describe your idea here..."
                            {...field}
                            rows={"10"}
                            value={description}
                            onChange={(e) => handleRequired(setDescription,e.target.value,setEnteredDescription)}
                          />
                          <Tooltip label="Describe your idea in more detail!">
                            <Box height={"fit-content"}><BsInfoCircle/></Box>
                          </Tooltip>
                          </HStack>
                          <FormErrorMessage>Description is Required.</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Field name="iconurl">
                    {({ field, form }) => (
                      <FormControl id="iconurl" isRequired={"true"} isInvalid={validateRequired(iconURL,enteredIconURL)}>
                        <FormLabel>Icon URL</FormLabel>
                        <HStack>
                        <Input
                          placeholder="https://picsum.photos/200"
                          {...field}
                          value={iconURL}
                          onChange={(e) => handleRequired(setIconURL,e.target.value,setEnteredIconURL)}
                          type="text"
                        />
                        <Tooltip label="What image would best capture what your idea is hoping to achieve?">
                            <Box height={"fit-content"}><BsInfoCircle/></Box>
                          </Tooltip>
                          </HStack>
                          <FormErrorMessage>Icon URL is Required.</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Box></Box>
                </Stack>
                <Stack spacing={4} width={"50%"} padding={"50px"}>
                  <HStack>
                    <Text fontSize={"xl"} fontWeight={"bold"}>Additional Details</Text>
                    <Tooltip label="Does any of the following apply to your idea?">
                        <Box height={"fit-content"}><BsInfoCircle/></Box>
                      </Tooltip>
                  </HStack>
                  <Checkbox name="ispaid">Paid</Checkbox>
                  <Checkbox name="inprogress">In Progress</Checkbox>
                  <Checkbox name="isprivate">Private</Checkbox>
                  <HStack>
                    <Text fontSize={"xl"} fontWeight={"bold"}>Domains, Topics and Technologies</Text>
                    <Tooltip label="What areas would best be attributed to your idea? This will help people to find it!">
                        <Box height={"fit-content"}><BsInfoCircle/></Box>
                      </Tooltip>
                  </HStack>
                  <Box>
                    <Field name="Domain">
                      {({ field, form }) => (
                        <FormControl id="domain" isRequired={"true"} isInvalid={validateArrays(domns,enteredDomains)}>
                          <FormLabel>Domains</FormLabel>
                          <HStack>
                            {domains_sel}
                            <IconButton
                              icon={<RxPlus />}
                              borderRadius={"20px"}
                              onClick={() =>
                                handleArrays(document.getElementById("domains")
                                .selectedIndex,
                              domains,
                              c_domains,
                              rendered_domains,setEnteredDomains)
                              /*
                                function(){
                                setEnteredDomains(true);
                                
                                PushObj(
                                  document.getElementById("domains")
                                    .selectedIndex,
                                  domains,
                                  c_domains,
                                  rendered_domains
                                );
                                }
                                */
                              }
                            />
                          </HStack>
                          <FormErrorMessage>At least 1 domain is required.</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    {domainContainer}
                  </Box>
                  <Box>
                    <Field name="Topic">
                      {({ field, form }) => (
                        <FormControl
                          id="topic"
                          isRequired={"true"}
                          isInvalid={validateArrays(topcs,enteredTopics)}
                        >
                          <FormLabel>Topics</FormLabel>
                          <HStack>
                            {topics_sel}
                            <IconButton
                              icon={<RxPlus />}
                              borderRadius={"20px"}
                              onClick={() => handleArrays(
                                document.getElementById("topics")
                                    .selectedIndex,
                                  topics,
                                  c_topics,
                                  rendered_topics,
                                  setEnteredTopics
                              )
                              /*
                                function(){
                                setEnteredTopics(true);
                                PushObj(
                                  document.getElementById("topics")
                                    .selectedIndex,
                                  topics,
                                  c_topics,
                                  rendered_topics
                                );
                                }*/
                              }
                            />
                          </HStack>
                          <FormErrorMessage>At least 1 topic is required.</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    {topicContainer}
                  </Box>
                  <Box>
                    <Field name="Tech">
                      {({ field, form }) => (
                        <FormControl
                          id="tech"
                          isRequired={"true"}
                          isInvalid={validateArrays(tchs,enteredTechs)}
                        >
                          <FormLabel>Technologies</FormLabel>
                          <HStack>
                            {techs_sel}
                            <IconButton
                              icon={<RxPlus />}
                              borderRadius={"20px"}
                              onClick={() => handleArrays(
                                document.getElementById("techs")
                                    .selectedIndex,
                                  techs,
                                  c_techs,
                                  rendered_techs,
                                  setEnteredTechs
                              )
                               /* function(){
                                setEnteredTechs(true);
                                PushObj(
                                  document.getElementById("techs")
                                    .selectedIndex,
                                  techs,
                                  c_techs,
                                  rendered_techs
                                );
                                }*/
                              }
                            />
                          </HStack>
                          <FormErrorMessage>At least 1 technology is required.</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    {techContainer}
                  </Box>
                  <HStack>
                    <Text fontSize={"xl"} fontWeight={"bold"}>Supporting Images</Text>
                    <Tooltip label="Add links to any images that add to your idea description!">
                        <Box height={"fit-content"}><BsInfoCircle/></Box>
                      </Tooltip>
                  </HStack>
                  <Box>
                    <Field name="supportingimgurl">
                      {({ field, form }) => (
                        <FormControl id="supportingimgurls">
                          <FormLabel>Supporting Images (Optional)</FormLabel>
                          <Input
                            marginTop={"5px"}
                            placeholder="URL 1 (Optional)"
                            {...field}
                            type="text"
                          />
                          <Input
                            marginTop={"10px"}
                            placeholder="URL 2 (Optional)"
                            {...field}
                            type="text"
                          />
                          <Input
                            marginTop={"10px"}
                            placeholder="URL 3 (Optional)"
                            {...field}
                            type="text"
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                </Stack>
              </HStack>
              <Box width={"100%"} display={"flex"} justifyContent={"center"}>
                <Button
                  width={"30%"}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  loadingText="Submitting"
                  isLoading={props.isSubmitting}
                  isDisabled={
                    ((!(enteredTitle && enteredPurpose && enteredDescription && enteredIconURL && enteredDomains && enteredTopics && enteredTechs)) 
                    ||
                    (validateRequired(title,enteredTitle) || 
                    validateRequired(purpose,enteredPurpose) || 
                    validateRequired(description,enteredDescription) || 
                    validateRequired(iconURL,enteredIconURL) ||
                    validateArrays(domns,enteredDomains) ||
                    validateArrays(topcs,enteredTopics) ||
                    validateArrays(tchs,enteredTechs)
                    ))
                  }
                  type="submit"
                >
                  Create Idea
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Stack>
  );
}

export function find_in_arr(index, arr, c_arr) {
  for (var i = 0; i < c_arr.length; i++) {
    if (c_arr[i].id === arr[index].id) {
      return i;
    }
  }
  return -1;
}
