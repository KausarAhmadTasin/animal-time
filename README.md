# Animal Time

**Animal Time** is a web application where users can view and manage animals by category. The project is built using Next.js, Express.js, and MongoDB with image hosting support via ImgBB API.

#Live Link: [Animal Time](https://animal-time.vercel.app/)

## Features

- View animals categorized by type
- Add new animal categories
- Add animals with image upload
- Server-side data fetching
- Vercel deployment

## Technologies Used

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with MongoDB Atlas)
- **Image Hosting**: ImgBB API
- **Deployment**: Vercel (Frontend), Vercel (Backend)

## Environment Variables

Ensure you have the following environment variables set up for the project. These should be added in your Vercel Dashboard under the **Environment Variables** section:

### Frontend (Next.js)

| Key                              | Description                         |
| --------------------------------- | ----------------------------------- |
| `NEXT_PUBLIC_IMAGE_HOSTING_KEY`   | de276f22a1688c010c4c0e7e20cc73a3     |


## Installation and Setup


### Backend Setup (Express.js)

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/animal-time-server.git
   cd animal-time-server
