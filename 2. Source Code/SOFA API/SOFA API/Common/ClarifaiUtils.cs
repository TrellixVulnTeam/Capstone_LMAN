using Clarifai.Api;
using Clarifai.Channels;
using Google.Protobuf.Collections;
using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Clarifai.Api.V2;

namespace SOFA_API.Common
{
    public class ClarifaiUtils
    {
        V2Client Client { get; set; }
        Metadata Metadata { get; set; }

        public ClarifaiUtils()
        {
            Client = new V2Client(ClarifaiChannel.Grpc());
            Metadata = new Metadata{
                {"Authorization", "Key 574c116976f8472aa6dc6c34ab4416ec"}
            };
        }

        public RepeatedField<Concept> ModeratationImage(string url)
        {
            var response = Client.PostModelOutputs(
            new PostModelOutputsRequest()
            {
                ModelId = "e9576d86d2004ed1a38ba0cf39ecb4b1",
                Inputs =
                {
                    new List<Input>()
                    {
                        new Input()
                        {
                            Data = new Data()
                            {
                                Image = new Image()
                                {
                                    Url=url
                                }
                            }
                        }
                    }
                }
            }, Metadata);
            if (response.Status.Code != Clarifai.Api.Status.StatusCode.Success)
            {
                throw new Exception("Request failed, response: " + response);
            }

            Console.WriteLine("Predicted concepts:");
            foreach (var concept in response.Outputs[0].Data.Concepts)
            {
                Console.WriteLine($"{concept.Name,15} {concept.Value:0.00}");
            }

            return response.Outputs[0].Data.Concepts;
        }
        public RepeatedField<Input> AddImage(string url, string name)
        {

            Struct data = new Struct();
            Value value = new Value();
            value.StringValue = name;
            data.Fields.Add("name", value);

            var response = Client.PostInputs(
                new PostInputsRequest()
                {
                    Inputs =
                    {
                        new List<Input>()
                        {
                            new Input()
                            {
                                Id = name,
                                Data = new Data()
                                {
                                    Image = new Image()
                                    {
                                        Url=url
                                    },
                                    Metadata = data
                                }
                            }
                        }
                    }
                }
            , Metadata) ;
            if (response.Status.Code != Clarifai.Api.Status.StatusCode.Success)
            {
                throw new Exception("Request failed, response: " + response);
            }

            return response.Inputs;
        }
        public RepeatedField<Hit> SearchImage(string url)
        {

            var response = Client.PostSearches(
                new PostSearchesRequest()
                {
                    Query = new Query()
                    {
                        Ands =
                        {
                            new And()
                            {
                                Input = new Input()
                                {
                                    Data = new Data()
                                    {
                                        Image = new Image()
                                        {
                                            Url = url
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            , Metadata) ;
            if (response.Status.Code != Clarifai.Api.Status.StatusCode.Success)
            {
                throw new Exception("Request failed, response: " + response);
            }

            return response.Hits;
        }
        public RepeatedField<Hit> SearchImageTemp(string url)
        {

            var response = Client.PostAnnotationsSearches(
                new PostAnnotationsSearchesRequest()
                {
                    Searches =
                    {
                        new Search()
                        {
                            Query = new Query()
                            {
                                Ranks =
                                {
                                    new Rank()
                                    {
                                        Annotation = new Annotation()
                                        {
                                            Data = new Data()
                                            {
                                                Image = new Image()
                                                {
                                                    Url = url
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            , Metadata);
            if (response.Status.Code != Clarifai.Api.Status.StatusCode.Success)
            {
                throw new Exception("Request failed, response: " + response);
            }

            return response.Hits;
        }
    }
}

