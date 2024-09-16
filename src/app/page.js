import Image from "next/image";
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SwaggerUI url="/openapi.yaml" />
    </main>
  );
}
