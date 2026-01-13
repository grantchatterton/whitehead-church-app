import Container from "react-bootstrap/Container";

export default function AppFooter({ title }: { title: string }) {
  return (
    <footer className="footer text-center mt-auto">
      <Container>
        <p className="mb-0">
          &copy; {new Date().getFullYear()} {title}. All rights reserved.
        </p>
        {/* <p className="mb-0">
          Made with ❤️ by{" "}
          <a
            href="https://grantchatterton.com"
            target="_blank"
          >
            Grant Chatterton
          </a>
        </p> */}
      </Container>
    </footer>
  );
}
