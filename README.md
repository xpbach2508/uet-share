# Thesis [2024.12.15]

Thesis: Nghiên cứu tối ưu lịch trình cho bài toán chia sẻ chuyến đi

## Author

Phạm Xuân Bách - UET CN1 '25

## Server Repository

https://github.com/xpbach2508/be-uet-share

## Local Deployment

Create and configure environment variables in `.env` based on the `.env.example`:

```properties
# HERE Maps API
NEXT_PUBLIC_HERE_API_KEY=your_here_maps_api_key

# Backend API
NEXT_PUBLIC_API_BASE_URL=http://localhost:8081

# WebSocket
NEXT_PUBLIC_SOCKET_BASE_URL=http://localhost:8082/
```

Then

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Documentation References

- For API credentials setup, see the [HERE Maps Documentation](https://www.here.com/docs/bundle/getting-here-credentials/page/README.html)

## Technical Stack

This project is built with [Next.js](https://nextjs.org/), a React framework for production.
