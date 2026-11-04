import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function AdminPinModal({ isOpen, onClose, onSuccess, C, isLight }) {
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setPin('');
      setErrorMsg('');
      setShake(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleVerify = async (pinToTest = pin) => {
    if (!pinToTest || pinToTest.length < 4) {
      setErrorMsg('Please enter your 5-digit PIN');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setIsVerifying(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/auth/verify-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pinToTest })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        sessionStorage.setItem('kod_admin_token', data.token || 'authenticated');
        onSuccess();
        onClose();
      } else {
        // Fallback check if server offline or default pin 12345
        if (pinToTest === '12345') {
          sessionStorage.setItem('kod_admin_token', 'offline-auth-12345');
          onSuccess();
          onClose();
        } else {
          setErrorMsg(data.error || 'Incorrect PIN. Access Denied.');
          setShake(true);
          setTimeout(() => setShake(false), 500);
        }
      }
    } catch {
      // Offline fallback: allow default 12345
      if (pinToTest === '12345') {
        sessionStorage.setItem('kod_admin_token', 'offline-auth-12345');
        onSuccess();
        onClose();
      } else {
        setErrorMsg('Invalid Admin PIN. (Default: 12345)');
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleVerify();
    }
  };

  const handleKeypadDigit = (digit) => {
    if (pin.length < 6) {
      const newPin = pin + digit;
      setPin(newPin);
      if (newPin.length === 5) {
        handleVerify(newPin);
      }
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
    setErrorMsg('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(5, 6, 10, 0.88)',
          backdropFilter: 'blur(16px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            x: shake ? [-14, 14, -10, 10, -5, 5, 0] : 0
          }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '380px',
            background: '#111319',
            borderRadius: '24px',
            padding: '2rem 1.8rem',
            border: `1px solid ${shake ? '#ff4d4d' : C.acid}`,
            boxShadow: `0 25px 70px rgba(0,0,0,0.8), 0 0 30px ${shake ? 'rgba(255,77,77,0.3)' : C.acidGlow}`,
            color: '#f5f5f0',
            fontFamily: "'DM Sans', sans-serif"
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(255,255,255,0.06)',
              border: 'none',
              color: '#f5f5f0',
              width: 32,
              height: 32,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: C.acidBadge,
                color: '#000',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                boxShadow: `0 0 20px ${C.acidGlow}`
              }}
            >
              <Lock size={22} strokeWidth={2.5} />
            </div>
            <h3
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: '1.6rem',
                fontWeight: 400,
                color: '#f5f5f0',
                margin: 0
              }}
            >
              Admin Access
            </h3>
            <p style={{ color: 'rgba(245,245,240,0.5)', fontSize: '0.82rem', marginTop: '0.4rem' }}>
              Enter 5-digit PIN to manage partner logos, reels & posters
            </p>
          </div>

          {/* Masked PIN Bullets display */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '1.5rem'
            }}
          >
            {[0, 1, 2, 3, 4].map((i) => {
              const filled = pin.length > i;
              return (
                <div
                  key={i}
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    border: `1.5px solid ${filled ? C.acid : 'rgba(245,245,240,0.25)'}`,
                    background: filled ? C.acidBadge : 'transparent',
                    boxShadow: filled ? `0 0 10px ${C.acidGlow}` : 'none',
                    transition: 'all 0.2s'
                  }}
                />
              );
            })}
          </div>

          {/* Hidden input for physical keyboard entry */}
          <input
            ref={inputRef}
            type="password"
            maxLength={6}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
            onKeyDown={handleKeyPress}
            style={{
              position: 'absolute',
              opacity: 0,
              pointerEvents: 'none',
              top: 0,
              left: 0
            }}
          />

          {/* Error Message */}
          {errorMsg && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                color: '#ff6b6b',
                fontSize: '0.78rem',
                marginBottom: '1rem',
                textAlign: 'center'
              }}
            >
              <AlertCircle size={14} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* On-screen tactile keypad */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '10px',
              marginBottom: '1.2rem'
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleKeypadDigit(String(num))}
                style={{
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#f5f5f0',
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
                onMouseDown={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
                onMouseUp={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
              >
                {num}
              </button>
            ))}
            <button
              type="button"
              onClick={handleBackspace}
              style={{
                height: '46px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                color: 'rgba(245,245,240,0.6)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              ⌫
            </button>
            <button
              type="button"
              onClick={() => handleKeypadDigit('0')}
              style={{
                height: '46px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#f5f5f0',
                fontSize: '1.15rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              0
            </button>
            <button
              type="button"
              onClick={() => handleVerify()}
              disabled={isVerifying}
              style={{
                height: '46px',
                borderRadius: '12px',
                background: C.acidBadge,
                border: 'none',
                color: '#000',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 0 15px ${C.acidGlow}`
              }}
            >
              {isVerifying ? '...' : <ArrowRight size={18} />}
            </button>
          </div>

          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: 'rgba(245,245,240,0.35)' }}>
              Default PIN: <strong style={{ color: C.acid }}>12345</strong>
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
