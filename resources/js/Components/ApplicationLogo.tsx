import { Link } from '@inertiajs/react';

export default function ApplicationLogo({ className = '' }) {
  return (
    <div className={`flex justify-center ${className}`}>
      <Link href="/" className="flex justify-center">
        <img
          className="h-[100px]"
          src="/img/tc-logo.png"
          alt="Tangub City logo"
        />
      </Link>
    </div>
  );
}
