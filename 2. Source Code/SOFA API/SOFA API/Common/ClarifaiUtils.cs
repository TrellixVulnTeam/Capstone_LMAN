using Clarifai.Api;
using Clarifai.Channels;
using Google.Protobuf.Collections;
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
                ModelId = "d16f390eb32cad478c7ae150069bd2c6",
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
    }
}

