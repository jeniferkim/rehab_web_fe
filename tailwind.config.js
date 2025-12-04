/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // 1) 컬러 토큰
      colors: {
        // 브랜드 계열
        brand: {
          blue: '#2563EB',          // main brand
          'blue-light': '#EFF6FF',  // background / accent
          'blue-border': '#BFDBFE', // selected border
        },

        // 중립 계열
        neutral: {
          black: '#121212',          // main text
          'gray-dark': '#333333',    // sub text
          'gray-medium': '#666666',  // description, disabled
          'gray-light': '#E5E7EB',   // divider, border
          'gray-light2': '#E0E0E0',  // border, placeholder
          background: '#FAFAFA',     // main background
          white: '#FFFFFF',          // cards, modal bg
        },

        // 상태 컬러
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
        },

        // 컴포넌트 전용 (원하면)
        divider: '#F3F4F6',
      },

      // 2) 폰트 패밀리
      fontFamily: {
        sans: [
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'sans-serif',
        ],
      },

      // 3) 텍스트 사이즈 + line-height + weight 프리셋
      fontSize: {
        // Page Title: 24 / 32 (Bold)
        'page-title': [
          '24px',
          { lineHeight: '32px', fontWeight: '700' },
        ],

        // Section Title: 18 / 24 (Bold)
        'section-title': [
          '18px',
          { lineHeight: '24px', fontWeight: '700' },
        ],

        // Card Title / Button: 16 / 20~22 (SemiBold/Bold)
        'card-title': [
          '16px',
          { lineHeight: '22px', fontWeight: '600' }, // SemiBold
        ],

        // Body Text: 14 / 20 (Regular)
        body: [
          '14px',
          { lineHeight: '20px', fontWeight: '400' },
        ],

        // Caption: 12 / 16 (Regular)
        caption: [
          '12px',
          { lineHeight: '16px', fontWeight: '400' },
        ],
      },

      // 4) Radius 토큰 (카드/모달/필 모양 등)
      borderRadius: {
        'card-md': '12px',
        'card-lg': '16px',
        modal: '24px',
        pill: '9999px', // rounded-full 비슷하지만 이름으로도 사용 가능
      },

      // 5) Spacing 토큰 (시간 슬롯 width 등)
      spacing: {
        15: '60px', // Routine 카드에서 time column width = 60
      },

      // 6) 그림자 프리셋 (선택)
      boxShadow: {
        card: '0 4px 12px rgba(0,0,0,0.04)',
        modal: '0 16px 40px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [
    // 공통 컴포넌트 유틸리티
    function ({ addComponents, theme }) {
      const colors = theme('colors');

      addComponents({
        /* ===== 버튼 계열 ===== */

        // FixedBottomButton (Primary)
        '.btn-fixed-primary': {
          width: '100%',
          paddingTop: '16px',
          paddingBottom: '16px',
          borderRadius: theme('borderRadius.full'),
          backgroundColor: colors.neutral.black,
          color: colors.neutral.white,
          fontSize: theme('fontSize.card-title')[0],
          lineHeight: theme('fontSize.card-title')[1].lineHeight,
          fontWeight: theme('fontSize.card-title')[1].fontWeight,
          textAlign: 'center',
        },
        '.btn-fixed-primary:disabled': {
          backgroundColor: '#9CA3AF',
          cursor: 'not-allowed',
        },

        // Create Button (List Action)
        '.btn-create': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8px 12px',
          borderRadius: theme('borderRadius.full'),
          backgroundColor: colors.brand['blue-light'],
          borderWidth: '1px',
          borderColor: colors.brand['blue-border'],
          color: colors.brand.blue,
          fontSize: theme('fontSize.body')[0],
          fontWeight: '500',
          gap: '6px',
        },

        // Icon Button
        '.btn-icon': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8px',
          borderRadius: theme('borderRadius.full'),
        },

        /* ===== 카드 ===== */

        // RoutineItemCard 컨테이너
        '.card-routine': {
          display: 'flex',
          borderRadius: theme('borderRadius.card-lg'),
          backgroundColor: colors.neutral.white,
          padding: '16px 20px',
          boxShadow: theme('boxShadow.card'),
          gap: '16px',
        },

        // RoutineItemCard 시간 영역
        '.card-routine-time': {
          width: theme('spacing.15'),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          fontSize: theme('fontSize.body')[0],
          lineHeight: theme('fontSize.body')[1].lineHeight,
          color: colors.neutral['gray-medium'],
        },

        // 세로 디바이더
        '.card-routine-divider': {
          width: '1px',
          backgroundColor: '#F3F4F6',
        },

        // 중앙 콘텐츠
        '.card-routine-main': {
          flex: '1 1 0%',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        },

        // 우측 액션 영역
        '.card-routine-actions': {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '8px',
        },

        /* ===== 모달 ===== */

        // CustomModal
        '.modal-panel': {
          borderRadius: theme('borderRadius.modal'),
          backgroundColor: colors.neutral.white,
          padding: '24px 20px',
          boxShadow: theme('boxShadow.modal'),
        },
        '.modal-overlay': {
          position: 'fixed',
          inset: '0',
          backgroundColor: 'rgba(0,0,0,0.4)',
        },

        // Calendar/TimePicker Modal Title Pill
        '.modal-title-pill': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '6px 14px',
          borderRadius: theme('borderRadius.pill'),
          backgroundColor: colors.brand['blue-light'],
          color: colors.brand.blue,
          fontSize: theme('fontSize.caption')[0],
          lineHeight: theme('fontSize.caption')[1].lineHeight,
          fontWeight: '600',
        },

        /* ===== 인풋 ===== */

        '.input-default': {
          width: '100%',
          padding: '12px 16px',
          borderRadius: '12px',
          backgroundColor: '#F9FAFB',
          borderWidth: '1px',
          borderColor: colors.neutral['gray-light2'],
          fontSize: theme('fontSize.body')[0],
          lineHeight: theme('fontSize.body')[1].lineHeight,
          color: colors.neutral.black,
        },
        '.input-default::placeholder': {
          color: colors.neutral['gray-medium'],
        },

        /* ===== 피드백 (Toast / SnackBar) ===== */

        // 상단 Toast
        '.toast': {
          display: 'flex',
          alignItems: 'flex-start',
          gap: '8px',
          padding: '12px 16px',
          borderRadius: '12px',
          backgroundColor: colors.neutral.white,
          boxShadow: theme('boxShadow.card'),
          fontSize: theme('fontSize.body')[0],
        },
        '.toast-border-info': {
          borderLeftWidth: '6px',
          borderLeftColor: colors.brand.blue,
        },
        '.toast-border-warning': {
          borderLeftWidth: '6px',
          borderLeftColor: colors.status.warning,
        },
        '.toast-border-error': {
          borderLeftWidth: '6px',
          borderLeftColor: colors.status.error,
        },

        // 하단 SnackBar
        '.snackbar': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px 16px',
          borderRadius: '9999px',
          backgroundColor: colors.neutral.black,
          color: colors.neutral.white,
          fontSize: theme('fontSize.caption')[0],
        },
      });
    },
  ],
};
