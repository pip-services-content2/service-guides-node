# Guides Microservice

This is an application guides microservice from Pip.Services library. 
It provides guidance to application users: introduces about application features, tells about new version and so on.
Each guide:
- Can be written in multiple languages
- Can include one or more pages with title, text and a picture
- Supports editing lifecycle via status tracking

The microservice currently supports the following deployment options:
* Deployment platforms: Standalone Process
* External APIs: HTTP/REST, AWS Lambda
* Persistence: In-Memory, Flat Files, MongoDB

This microservice has dependencies on the following microservices:
- [pip-services-attachments](https://github.com/pip-services-content2/service-attachments-node) - to reference pictures and documents associates with guides

<a name="links"></a> Quick Links:

* [Download Links](doc/Downloads.md)
* [Development Guide](doc/Development.md)
* [Configuration Guide](doc/Configuration.md)
* [Deployment Guide](doc/Deployment.md)
* Client SDKs
  - [Node.js SDK](https://github.com/pip-services-content2/client-guides-node)
* Communication Protocols
  - [HTTP Version 1](doc/HttpProtocolV1.md)

##  Contract

Logical contract of the microservice is presented below. For physical implementation (HTTP/REST, Thrift, Lambda, etc.),
please, refer to documentation of the specific protocol.

```typescript
class GuideTypeV1 {
    public static readonly Introduction = "introduction";
    public static readonly NewRelease = "new release";
}

class GuideV1 implements IStringIdentifiable {
    /* Identification */
    public id: string;
    public type: string;
    public app?: string;
    public version?: string;

    /* Automatically managed fields */
    public create_time: Date;

    /* Content */
    public pages: GuidePageV1[];

    /* Search */
    public tags?: string[];
    public all_tags?: string[];

    /* Status */
    public status?: string;

    /* Custom fields */
    public custom_hdr?: any;
    public custom_dat?: any;
}

class GuidePageV1 {
    public title: MultiString;
    public content?: MultiString;
    public more_url?: string;
    public color?: string;
    public pic_id?: string;
    public pic_url?: string;
}

class GuideStatusV1 {
    public static readonly New = "new";
    public static readonly Writing = "writing";
    public static readonly Translating = "translating";
    public static readonly Verifying = "verifying";
    public static readonly Completed = "completed";
}

interface IGuidesV1 {
    getGuides(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<GuideV1>>;

    getRandomGuide(correlationId: string, filter: FilterParams): Promise<GuideV1>;

    getGuideById(correlationId: string, guideId: string): Promise<GuideV1>;

    createGuide(correlationId: string, guide: GuideV1): Promise<GuideV1>;

    updateGuide(correlationId: string, guide: GuideV1): Promise<GuideV1>;

    deleteGuideById(correlationId: string, guideId: string): Promise<GuideV1>;
}
```

## Download

Right now the only way to get the microservice is to check it out directly from github repository
```bash
git clone git@github.com:pip-services-content2/service-guides-node.git
```

Pip.Service team is working to implement packaging and make stable releases available for your 
as zip downloadable archieves.

## Run

Add **config.yaml** file to the root of the microservice folder and set configuration parameters.
As the starting point you can use example configuration from **config.example.yaml** file. 

Example of microservice configuration
```yaml
---
- descriptor: "pip-services:logger:console:default:1.0"
  level: "trace"

- descriptor: "service-guides:persistence:file:default:1.0"
  path: "./data/guides.json"

- descriptor: "service-guides:controller:default:default:1.0"

- descriptor: "pip-services-attachments:client:http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 8082

- descriptor: "service-guides:service:http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 8080
```
 
For more information on the microservice configuration see [Configuration Guide](Configuration.md).

Start the microservice using the command:
```bash
node run
```

## Use

The easiest way to work with the microservice is to use client SDK. 
The complete list of available client SDKs for different languages is listed in the [Quick Links](#links)

If you use Node.js then you should add dependency to the client SDK into **package.json** file of your project
```javascript
{
    ...
    "dependencies": {
        ....
        "client-guides-node": "^1.0.*",
        ...
    }
}
```

Inside your code get the reference to the client SDK
```javascript
let sdk = new require('client-guides-node');
```

Define client configuration parameters that match configuration of the microservice external API
```javascript
// Client configuration
let config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
let client = sdk.GuidesHttpClientV1(config);

// Connect to the microservice
try {
    await client.open(null);
    // Work with the microservice
    ...
} catch(err) {
    console.error('Connection to the microservice failed');
    console.error(err);
}
```

Now the client is ready to perform operations
```javascript
// Create a new guide
let guide = await client.createGuide(
    null,
    { 
        type: 'introduction',
        app: 'Test App 1',
        pages: [
            { 
                title: { en: 'Welcome to Test App 1' } 
            }
        ]
    }
);
```

```javascript
// Get a random intro guide for app1
let guide = await client.getRandomGuide(
    null,
    {
        type: 'introduction',
        app: 'app1'
    }
);
```    

## Acknowledgements

This microservice was created and currently maintained by *Sergey Seroukhov*.

