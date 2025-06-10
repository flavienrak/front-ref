'use client';

import React from 'react';
import PrimaryButton from '../utils/PrimaryButton';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import {
  codeVerificationService,
  mailVerificationService,
} from '@/services/mail.service';
import { toast } from 'sonner';

const otpSchema = z.object({
  otp: z.string().length(6, 'Le code OTP doit contenir 6 chiffres'),
});

type OtpFormValues = z.infer<typeof otpSchema>;

export default function MailValidationComponent() {
  const params = useParams();
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  React.useEffect(() => {
    let isMounted = true;

    const { token } = params;
    if (token && typeof token === 'string') {
      (async () => {
        const res = await mailVerificationService(token);

        if (isMounted) {
          console.log('res:', res);
          // if (!res.decoded) {
          //   router.push('/');
          // }
        }
      })();
    }

    return () => {
      isMounted = false;
    };
  }, [params.token]);

  const onSubmit = async (data: OtpFormValues) => {
    const parseRes = otpSchema.safeParse(data);

    if (parseRes.success) {
      const { token } = params;

      // API CALL
      if (isNaN(Number(parseRes.data.otp))) {
        form.setError('otp', {
          type: 'manual',
          message: 'Code OTP invalide',
        });
      } else if (token && typeof token === 'string') {
        setIsLoading(true);
        const res = await codeVerificationService({
          token,
          code: Number(parseRes.data.otp),
        });

        if (res.valid) {
          toast.success('Email vérifié avec succès', {
            description: 'Accès au plateforme',
          });
          window.location.href = '/room';
        } else {
          form.setError('otp', {
            type: 'manual',
            message: 'Code invalide',
          });
          setIsLoading(false);
        }
      }
    }
  };

  return (
    <div className="w-full h-full">
      <div className="min-h-screen flex justify-center items-center">
        <div className="flex flex-col items-center gap-8 p-8 rounded-xl shadow border border-[var(--text-primary-color)]/10">
          <h1 className="text-4xl font-semibold text-center bg-gradient-to-b from-[var(--primary-color)] to-[var(--primary-color)]/50 bg-clip-text text-transparent">
            Code de validation
          </h1>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col items-center gap-8"
            >
              <p className="max-w-sm text-center text-lg">
                Entrer le code à 6 chiffres que nous avons envoyé par e-mail.
              </p>

              <FormField
                name="otp"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-3">
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot
                            index={0}
                            className="h-12 w-12 text-lg"
                          />
                          <InputOTPSlot
                            index={1}
                            className="h-12 w-12 text-lg"
                          />
                          <InputOTPSlot
                            index={2}
                            className="h-12 w-12 text-lg"
                          />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot
                            index={3}
                            className="h-12 w-12 text-lg"
                          />
                          <InputOTPSlot
                            index={4}
                            className="h-12 w-12 text-lg"
                          />
                          <InputOTPSlot
                            index={5}
                            className="h-12 w-12 text-lg"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage className="text-center">
                      {form.formState.errors.otp?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <PrimaryButton
                type="submit"
                label="Valider"
                isLoading={isLoading}
                onClick={() => {}}
                className="w-full text-lg"
              />
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
