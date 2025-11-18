import React, { useState, useEffect, useRef } from "react";

const Contact = () => {
  const [stage, setStage] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState<number | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const contactRef = useRef<HTMLDivElement>(null);

  const contacts = [
    {
      id: 1,
      protocol: "SMTP",
      name: "EMAIL PROTOCOL",
      address: "ankitmanojg@gmail.com",
      link: "mailto:ankitmanojg@gmail.com",
      port: "587",
      encryption: "TLS",
      latency: "~50ms"
    },
    {
      id: 2,
      protocol: "HTTPS",
      name: "GITHUB API",
      address: "github.com/ankit70g",
      link: "https://github.com/ankit70g",
      port: "443",
      encryption: "SSL",
      latency: "~120ms"
    },
    {
      id: 3,
      protocol: "HTTPS",
      name: "LINKEDIN NETWORK",
      address: "linkedin.com/in/ankit-gupta-connect/",
      link: "https://linkedin.com/in/ankit-gupta-connect/",
      port: "443",
      encryption: "SSL",
      latency: "~95ms"
    }
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 500);
    const timer2 = setTimeout(() => setStage(2), 1500);

    const scanInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(scanInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(scanInterval);
    };
  }, []);

  // Auto-scroll when scanning is complete
  useEffect(() => {
    if (scanProgress === 100 && contactRef.current) {
      setTimeout(() => {
        contactRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 300);
    }
  }, [scanProgress]);

  return (
    <div ref={contactRef} className="font-mono text-sm">
      {/* Terminal Header */}
      <div className="border border-green-500 bg-black/50 p-3 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-green-400">CONTACT@ANKIT:~$</span>
          <span className="text-gray-500 text-xs">PID: 2847</span>
        </div>
        {stage >= 1 && (
          <div className="text-xs space-y-1 text-green-300">
            <div>{'>'} Scanning available communication channels...</div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 bg-gray-800 h-2 rounded overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-cyan-500 transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
              <span className="text-cyan-400 min-w-[45px]">{scanProgress}%</span>
            </div>
          </div>
        )}
        {stage >= 2 && scanProgress === 100 && (
          <div className="text-green-400 text-xs mt-2">
            ✓ Found {contacts.length} active channels
          </div>
        )}
      </div>

      {/* Connection Cards */}
      {stage >= 2 && scanProgress === 100 && (
        <div className="space-y-3">
          {contacts.map((contact, index) => (
            <div
              key={contact.id}
              className="relative"
              style={{
                animation: `slideIn 0.4s ease-out ${index * 0.15}s both`
              }}
            >
              <div
                className={`border ${selectedMethod === contact.id
                  ? 'border-cyan-400 bg-cyan-950/30'
                  : 'border-green-500/50 bg-gray-900/50'
                  } hover:border-cyan-400 transition-all duration-300 cursor-pointer`}
                onMouseEnter={() => setSelectedMethod(contact.id)}
                onMouseLeave={() => setSelectedMethod(null)}
              >
                {/* Header Bar */}
                <div className="bg-gray-950 px-3 py-1 border-b border-green-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${selectedMethod === contact.id ? 'bg-cyan-400 animate-pulse' : 'bg-green-500'
                      }`}></div>
                    <span className="text-yellow-400 font-bold text-xs">
                      {contact.protocol}://{contact.port}
                    </span>
                  </div>
                  <span className="text-gray-500 text-xs">{contact.encryption}</span>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="text-gray-400 text-xs mb-2">{contact.name}</div>
                  <a
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 underline decoration-dotted block mb-2"
                  >
                    {contact.address}
                  </a>

                  {/* Stats Row */}
                  <div className="flex gap-4 text-xs mt-3 pt-3 border-t border-green-500/20">
                    <div>
                      <span className="text-gray-500">LATENCY:</span>
                      <span className="text-green-400 ml-1">{contact.latency}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">STATUS:</span>
                      <span className="text-green-400 ml-1">ACTIVE</span>
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                {selectedMethod === contact.id && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8">
                    <div className="text-cyan-400 text-xl animate-pulse">→</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      {stage >= 2 && scanProgress === 100 && (
        <div
          className="mt-4 p-3 border border-green-500/30 bg-black/30"
          style={{ animation: 'slideIn 0.4s ease-out 0.6s both' }}
        >
          <div className="text-xs text-gray-400 space-y-1">
            <div className="flex justify-between">
              <span>⚡ Average Response Time:</span>
              <span className="text-green-400">&lt; 24 hours</span>
            </div>
            <div className="flex justify-between">
              <span>🌐 Availability:</span>
              <span className="text-green-400">24/7 Online</span>
            </div>
            <div className="flex justify-between">
              <span>🔐 Encryption:</span>
              <span className="text-cyan-400">End-to-End Secured</span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;